import { SchedulerFactory,SchedulerType } from "./schedulers";
import FIFOPageReplacement from "./paging/fifo";
import LRUPageReplacement from "./paging/lru";
import Process from "./interfaces/Process";
import PagingAlgorithm from "./interfaces/PagingAlgorithm";
import Scheduler from "./interfaces/Scheduler";

/// algo Escalonamento: FIFO, algo Paginacao: LRU
let processes: Process[] = [
  { id: 1, arrivalTime: 0, executionTime: 5, deadline:20, numPages:4 },
  { id: 2, arrivalTime: 2, executionTime: 3, deadline:17, numPages:2 },
  { id: 3, arrivalTime: 4, executionTime: 2, deadline:8 , numPages:3},
  { id: 4, arrivalTime: 6, executionTime: 4, deadline:10, numPages:4 },
  { id: 5, arrivalTime: 8, executionTime: 4, deadline:5 , numPages:2},
];

console.log("executando o algoritmo de escalonamento de processos FIFO, e paginacao LRU")
console.log("processos input: ")
for (const process of processes) {
  console.log(process);
}


let scheduler:Scheduler = SchedulerFactory.createScheduler(SchedulerType.FIFO)
let schedule = scheduler.schedule(processes)

console.log("escolonamento fifo:")
console.log(schedule)

let ramSize: number = 20; 
let pageSize: number = 4;
let diskSize: number = 80; 
const fifoPaging:PagingAlgorithm = new LRUPageReplacement(processes,ramSize,pageSize,diskSize)

console.log("paginacao LRU resultante:")
console.log(fifoPaging.run(schedule)) 
  

/// algo Escalonamento: RoundRObin, algo Paginacao: FIFO
processes = [
  { id: 1, arrivalTime: 0, executionTime: 3, deadline:20, numPages:4 },
  { id: 2, arrivalTime: 2, executionTime: 5, deadline:17, numPages:2 },
  { id: 3, arrivalTime: 4, executionTime: 2, deadline:10, numPages:3},
  { id: 4, arrivalTime: 6, executionTime: 2, deadline:8, numPages:4 },
  { id: 5, arrivalTime: 8, executionTime: 4, deadline:6, numPages:2},
];

console.log("executando o algoritmo de escalonamento de processos Round Robin, e paginacao FIFO")
console.log("processos input: ")
for (const process of processes) {
  console.log(process);
}

scheduler = SchedulerFactory.createScheduler(SchedulerType.RoundRobin)
schedule = scheduler.schedule(processes)

console.log("escolonamento Round Robin:")
console.log(schedule)

ramSize = 20; 
pageSize = 4;
diskSize = 80; 

const lruPaging:PagingAlgorithm = new FIFOPageReplacement(processes,ramSize,pageSize,diskSize)

console.log("paginacao FIFO resultante:")
console.log(lruPaging.run(schedule)) 
  