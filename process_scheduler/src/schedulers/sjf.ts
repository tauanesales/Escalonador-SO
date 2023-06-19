import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

function getShortestArrivedProcess(processes:Process[],arrivedProcesses:number[]): number{

  let smallestExecutionTime:number = Infinity
  let shortestProcessIndex:number = -1

  for(let i=0;i<arrivedProcesses.length;i++){
    let executionTime = processes[arrivedProcesses[i]].executionTime 
    if(executionTime < smallestExecutionTime){
      smallestExecutionTime = executionTime
      shortestProcessIndex = arrivedProcesses[i]
    }
  }

  return shortestProcessIndex
}

const sjfScheduler: Scheduler = (processes: Process[]) => {
  let schedule: number[] = [];
  let currentProcess: Process;
  let counter: number = 0;
  while (processes.length !== 0) {

    const arrivedProcesses: number[] = processes
      .map((process, index) => (process.arrivalTime <= counter ? index : -1))
      .filter((index) => index !== -1);

    const shortestProcess: number = getShortestArrivedProcess(processes,arrivedProcesses)

    currentProcess = processes[shortestProcess];
    while (currentProcess.executionTime !== 0) {
      schedule[counter] = currentProcess.id;
      currentProcess.executionTime -= 1;
      counter++;
    }

    processes.splice(shortestProcess, 1);
  }

  return schedule;
};

export default sjfScheduler;