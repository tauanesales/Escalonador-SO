import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

class FIFOScheduler implements Scheduler {
  public schedule(processes: Process[]): number[] {
    const processesQueue: Process[] = processes.sort(
      (p1, p2) => p1.arrivalTime - p2.arrivalTime
    );

    let schedule: number[] = [];
    let currentProcess: Process;
    let counter: number = 0;

    while (processesQueue.length !== 0) {
      currentProcess = processesQueue.shift() as Process;
      while (currentProcess.executionTime !== 0) {
        schedule[counter] = currentProcess.id;
        currentProcess.executionTime -= 1;
        counter++;
      }
    }

    return schedule;
  }
}

export default FIFOScheduler;
