import Process from "../interfaces/Process";
import GeneralStorage from "./storage"
import PaginationData from "../interfaces/PaginationData";

class LRUQueue {
    private queue:number[]

    constructor() {
        this.queue = []
    }

    get lru():number{
        return this.queue[0]
    }

    public shift():number|undefined{
        return this.queue.shift()
    }

    public updateProcess(processId:number):void{
        for(let i=0;i<this.queue.length;i++){
            if(this.queue[i] === processId){
                this.queue.splice(i,1)
                break
            }
        }

        this.queue.push(processId)
    }

}

class LRUPageReplacement implements PagingAlgorithm{
  private ram: GeneralStorage;
  private disk: GeneralStorage;
  private pageTable: Map<number, number>;
  private pageNumMap: Map<number, number>
  private LRUQueue: LRUQueue

  constructor(processes:Process[],ramSize: number, pageSize: number, diskSize: number) {

    this.ram = new GeneralStorage(ramSize,pageSize)
    this.disk = new GeneralStorage(diskSize,pageSize)
    this.pageTable = new Map<number, number>();
    this.pageNumMap = new Map<number,number>();
    this.LRUQueue = new LRUQueue()

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
    this.LRUQueue.updateProcess(processId)
    let numDiskPages:number = (this.pageNumMap.get(processId) as number) - (this.pageTable.get(processId) as number)
    if(numDiskPages===0) return

    if(numDiskPages > this.ram.storageLeft){
      let allocatedStorage:number = this.ram.storageLeft
      while(allocatedStorage < numDiskPages){

        let LRUProcess:number = this.LRUQueue.lru
        let LRUProcessRamPages:number = this.pageTable.get(LRUProcess) as number
        let newAllocatedStorage:number = LRUProcessRamPages + allocatedStorage

        if(newAllocatedStorage <= numDiskPages) {

          allocatedStorage = newAllocatedStorage
          this.LRUQueue.shift()
          this.ramToDisk(LRUProcess,LRUProcessRamPages)

        }else{

          let necessaryPages = numDiskPages - allocatedStorage
          allocatedStorage += necessaryPages
          this.ramToDisk(LRUProcess,necessaryPages)
        }
      }
    }    

    this.diskToRam(processId,numDiskPages)
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
const scheduler = SchedulerFactory.createScheduler(SchedulerType.RoundRobin)
const shedule = scheduler.schedule(processes)


// Example usage:
const ramSize: number = 40; 
const pageSize: number = 4;
const diskSize: number = 80; 

const fifo = new LRUPageReplacement(processes,ramSize,pageSize,diskSize)
console.log(fifo.run(shedule)) 
