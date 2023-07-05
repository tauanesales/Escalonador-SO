import { IProcess } from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";
import RotatingQueue from "../data/RotatingQueue";
import ChartBoxEnum from "../components/ChartSection/ChartBoxEnum";

export default class RoundRobinScheduler implements Scheduler {
  public schedule(
    processes: IProcess[],
    quantum: number = 2,
    overheadTime: number = 1
  ): number[] {
    let _processes: IProcess[] = [...processes].map((obj) =>
      Object.assign({}, obj)
    );
    let schedule: number[] = [];
    let currentProcess: IProcess;
    let currentMomentOfExecution: number = 0;
    let processIterations: number = 0;
    let processIndex: number = -1;
    let lastProcessEnded: boolean = false;

    let queue: RotatingQueue = new RotatingQueue();

    while (_processes.length !== 0) {
      const arrivedProcesses = _processes
        .filter((process) => process.arrivalTime <= currentMomentOfExecution)
        .map((process) => process.id);

      if (arrivedProcesses.length === 0) {
        schedule[currentMomentOfExecution] = ChartBoxEnum.Empty;
        currentMomentOfExecution++;
        continue;
      }

      queue.addElements(arrivedProcesses);

      if (lastProcessEnded === false) {
        queue.rotate();
      }

      processIndex = this.getProcessIndex(queue.get(), _processes);
      currentProcess = _processes[processIndex];

      // quantum time execution
      processIterations = Math.min(currentProcess?.executionTime, quantum);
      for (let i = 0; i < processIterations; i++) {
        schedule[currentMomentOfExecution] = currentProcess.id;
        currentProcess.executionTime -= 1;
        currentMomentOfExecution++;
      }

      if (currentProcess.executionTime !== 0) {
        //overhead
        for (let i = 0; i < overheadTime; i++) {
          schedule[currentMomentOfExecution] = -1;
          currentMomentOfExecution++;
        }

        lastProcessEnded = false;
      } else {
        _processes.splice(processIndex, 1);
        queue.remove(currentProcess.id);
        lastProcessEnded = true;
      }
    }

    return schedule;
  }

  private getProcessIndex(processId: number, processes: IProcess[]) {
    for (let i = 0; i < processes.length; i++) {
      if (processes[i].id == processId) {
        return i;
      }
    }

    return -1;
  }
}
