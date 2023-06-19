import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

function getEarliestDeadlineProcess(processes:Process[],arrivedProcesses:number[]): number{

  let earliestDeadline:number = Infinity
  let earliestDeadlineIndex:number = -1

  for(let i=0;i<arrivedProcesses.length;i++){
    let process:Process = processes[arrivedProcesses[i]]
    let deadline:number = process.deadline as number + process.arrivalTime
    if(deadline < earliestDeadline){
      earliestDeadline = deadline
      earliestDeadlineIndex = arrivedProcesses[i]
    }
  }

  return earliestDeadlineIndex
}

const edfScheduler: Scheduler = (processes: Process[],quantum:number=2,overheadTime:number=1) => {
  let schedule: number[] = [];
  let currentProcess: Process;
  let counter: number = 0;
  while (processes.length !== 0) {

    const arrivedProcesses: number[] = processes
      .map((process, index) => (process.arrivalTime <= counter ? index : -1))
      .filter((index) => index !== -1);

    const earliestDeadlineProcess: number = getEarliestDeadlineProcess(processes,arrivedProcesses)
    currentProcess = processes[earliestDeadlineProcess]
    for(let i=0; i<quantum; i++) {

      schedule[counter] = currentProcess.id;
      currentProcess.executionTime -= 1;
      counter++;

      if(currentProcess.executionTime == 0) break;
    }

    //overhead
    if(currentProcess.executionTime !== 0){
      for(let i=0;i<overheadTime;i++){
        schedule[counter] = -1;
        counter++;        
      }
    }else{
      processes.splice(earliestDeadlineProcess, 1);
    }
  }

  return schedule;
};

export default edfScheduler