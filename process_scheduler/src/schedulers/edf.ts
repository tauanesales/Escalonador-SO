import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

export default class EDFScheduler implements Scheduler {
  public schedule(
    processes: Process[],
    quantum: number = 2,
    overheadTime: number = 1
  ): number[] {
    let _processes: Process[] = [...processes];

    let schedule: number[] = [];
    let currentProcess: Process;
    let counter: number = 0;
    let processIterations: number = 0;

    while (_processes.length !== 0) {
      const arrivedProcesses: number[] = _processes
        .map((process, index) => (process.arrivalTime <= counter ? index : -1))
        .filter((index) => index !== -1);

      const earliestDeadlineIndex: number = this.getEarliestDeadlineProcess(
        _processes,
        arrivedProcesses
      );

      currentProcess = _processes[earliestDeadlineIndex];

      processIterations = Math.min(currentProcess.executionTime, quantum);
      for (let i = 0; i < processIterations; i++) {
        schedule[counter] = currentProcess.id;
        currentProcess.executionTime -= 1;
        counter++;
      }

      //overhead
      if (currentProcess.executionTime !== 0) {
        for (let i = 0; i < overheadTime; i++) {
          schedule[counter] = -1;
          counter++;
        }
      } else {
        _processes.splice(earliestDeadlineIndex, 1);
      }
    }

    return schedule;
  }

  private getEarliestDeadlineProcess(
    processes: Process[],
    arrivedProcesses: number[]
  ): number {
    let earliestDeadline: number = Infinity;
    let earliestDeadlineIndex: number = -1;

    for (let i = 0; i < arrivedProcesses.length; i++) {
      let process: Process = processes[arrivedProcesses[i]];
      let deadline: number = (process.deadline as number) + process.arrivalTime;
      if (deadline < earliestDeadline) {
        earliestDeadline = deadline;
        earliestDeadlineIndex = arrivedProcesses[i];
      }
    }

    return earliestDeadlineIndex;
  }
}
