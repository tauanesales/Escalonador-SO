import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

const processes: Process[] = [
  { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20 },
  { id: 2, arrivalTime: 2, executionTime: 3, deadline: 10 },
  { id: 3, arrivalTime: 4, executionTime: 2, deadline: 12 },
  { id: 4, arrivalTime: 6, executionTime: 4, deadline: 17 },
  { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5 },
];

const roundRobinScheduler: Scheduler = (
  processes: Process[],
  quantum: number = 2,
  overheadTime: number = 1
) => {
  let schedule: number[] = [];

  while (processes.length !== 0) {
    
  }

  return schedule;
};

console.log(roundRobinScheduler(processes));
