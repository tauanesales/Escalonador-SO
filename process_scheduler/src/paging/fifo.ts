import Process from "../interfaces/Process";
import GeneralStorage from "./storage"
import PaginationData from "../interfaces/PaginationData";

class FIFOPageReplacement implements PagingAlgorithm{
  private ram: GeneralStorage;
  private disk: GeneralStorage;
  private pageTable: Map<number, number>;
  private pageNumMap: Map<number, number>
  private firstInQueue: number[] = []

  constructor(processes:Process[],ramSize: number, pageSize: number, diskSize: number) {

    this.ram = new GeneralStorage(ramSize,pageSize)
    this.disk = new GeneralStorage(diskSize,pageSize)
    this.pageTable = new Map<number, number>();
    this.pageNumMap = new Map<number,number>();

    // Initially: 
    //    load all processes pages on disk 
    //    store the total number of pages of each process.
    //    intialize the page table
    let process:Process;
    for(let i=0;i<processes.length;i++){
      process = processes[i]
      this.disk.store(process.id,process.numPages)
      this.pageNumMap.set(process.id,process.numPages)
      this.pageTable.set(process.id,0)
    }
  }

  private loadProcessPages(processId: number): void {
    let numDiskPages:number = (this.pageNumMap.get(processId) as number) - (this.pageTable.get(processId) as number)
    if(numDiskPages===0) return

    if(numDiskPages > this.ram.storageLeft){
      let allocatedStorage:number = this.ram.storageLeft
      while(allocatedStorage < numDiskPages){

        let firstInProcess:number = this.firstInQueue[0]
        let firstInProcessRamPages:number = this.pageTable.get(firstInProcess) as number
        let newAllocatedStorage:number = firstInProcessRamPages + allocatedStorage


        if(newAllocatedStorage <= numDiskPages) {

          allocatedStorage = newAllocatedStorage
          this.firstInQueue.shift()
          this.ramToDisk(firstInProcess,firstInProcessRamPages)

        }else{

          let necessaryPages = numDiskPages - allocatedStorage
          allocatedStorage += necessaryPages
          this.ramToDisk(firstInProcess,necessaryPages)
        }
      }
    }    

    this.diskToRam(processId,numDiskPages)
    this.firstInQueue.push(processId)
  }

  private ramToDisk(processId:number,numPages:number):void{
    this.ram.release(processId,numPages)
    this.disk.store(processId,numPages)

    const previousNumPages = this.pageTable.get(processId) as number
    this.pageTable.set(processId,previousNumPages-numPages) 
  }

  private diskToRam(processId:number,numPages:number):void{
    this.disk.release(processId,numPages)
    this.ram.store(processId,numPages)

    const previousNumPages = this.pageTable.get(processId) as number
    this.pageTable.set(processId,previousNumPages+numPages) 
  }

  public run(schedule:number[]):PaginationData[]{

    const pagingData:PaginationData[] = []
    let currProcess:number

    for(let i=0;i<schedule.length;i++){
      currProcess = schedule[i]

      if (currProcess !== -1) this.loadProcessPages(schedule[i])

      pagingData.push({
        step: i,
        executedProcess:currProcess,
        ram: [...this.ram.storage],
        disk: [...this.disk.storage]
      })
    }

    return pagingData
  }



}


let processes: Process[] = [
  { id: 1, arrivalTime: 0, executionTime: 5, deadline:20, numPages:4 },
  { id: 2, arrivalTime: 2, executionTime: 3, deadline:17, numPages:2 },
  { id: 3, arrivalTime: 4, executionTime: 2, deadline:8 , numPages:3},
  { id: 4, arrivalTime: 6, executionTime: 4, deadline:10, numPages:4 },
  { id: 5, arrivalTime: 8, executionTime: 4, deadline:5 , numPages:2},
];

import { SchedulerFactory, SchedulerType } from "../schedulers";
import PagingAlgorithm from "../interfaces/PagingAlgorithm";
const scheduler = SchedulerFactory.createScheduler(SchedulerType.EDF)
const shedule = scheduler.schedule(processes)


// Example usage:
const ramSize: number = 20; 
const pageSize: number = 4;
const diskSize: number = 80; 

const fifo = new FIFOPageReplacement(processes,ramSize,pageSize,diskSize)
console.log(fifo.run(shedule)) 
