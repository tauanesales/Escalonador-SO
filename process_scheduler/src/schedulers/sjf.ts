import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

export default class SJFScheduler implements Scheduler {
  public schedule(processes: Process[]): number[] {
    let _processes: Process[] = [...processes];
    let schedule: number[] = [];
    let currentProcess: Process;
    let counter: number = 0;
    while (_processes.length !== 0) {
      const arrivedProcesses: number[] = _processes
        .map((process, index) => (process.arrivalTime <= counter ? index : -1))
        .filter((index) => index !== -1);

      const shortestProcessIndex: number = this.getShortestProcess(
        _processes,
        arrivedProcesses
      );
      currentProcess = _processes[shortestProcessIndex];

      while (currentProcess.executionTime !== 0) {
        schedule[counter] = currentProcess.id;
        currentProcess.executionTime -= 1;
        counter++;
      }

      _processes.splice(shortestProcessIndex, 1);
    }

    return schedule;
  }

  private getShortestProcess(
    processes: Process[],
    arrivedProcesses: number[]
  ): number {
    let smallestExecutionTime: number = Infinity;
    let shortestProcessIndex: number = -1;

    for (let i = 0; i < arrivedProcesses.length; i++) {
      let executionTime = processes[arrivedProcesses[i]].executionTime;
      if (executionTime < smallestExecutionTime) {
        smallestExecutionTime = executionTime;
        shortestProcessIndex = arrivedProcesses[i];
      }
    }

    return shortestProcessIndex;
  }
}
