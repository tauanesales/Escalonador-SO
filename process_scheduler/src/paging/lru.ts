import Process from "../interfaces/Process";
import LRUQueue from "../data/LRUQueue";
import AbsPaging from "./AbsPaging";


export default class LRUPageReplacement extends AbsPaging{
  private LRUQueue: LRUQueue

  constructor(processes:Process[],ramSize: number, pageSize: number, diskSize: number) {
    super(processes,ramSize,pageSize,diskSize)
    this.LRUQueue = new LRUQueue()
  }

  loadProcessPages(processId: number): void {
    this.LRUQueue.updateProcess(processId) // update the process position in the LRU queue
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
}
