import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

export const fifoScheduler: Scheduler = (processes: Process[]) => {
  const processesQueue: Process[] = processes.sort(
    (p1, p2) => p1.arrivalTime - p2.arrivalTime
  );

  let schedule: number[] = [];
  let currentProcess: Process;
  let counter: number = 0;
  while (processesQueue.length !== 0) {
    currentProcess = processes.shift() as Process;

    while (currentProcess.executionTime !== 0) {
      schedule[counter] = currentProcess.id;
      currentProcess.executionTime -= 1;
      counter++;
    }
  }

  return schedule;
};
