import { IProcess } from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";
import ChartBoxEnum from "../components/ChartSection/ChartBoxEnum";

export default class EDFScheduler implements Scheduler {
  public schedule(
    processes: IProcess[],
    quantum: number = 2,
    overheadTime: number = 1
  ): number[] {
    let _processes: IProcess[] = [...processes].map((process) =>
      Object.assign({}, process)
    );

    let schedule: number[] = [];
    let currentProcess: IProcess;
    let currentMomentOfExecution: number = 0;
    let processIterations: number = 0;

    while (_processes.length !== 0) {
      const arrivedProcesses: number[] = _processes
        .map((process, index) =>
          process.arrivalTime <= currentMomentOfExecution ? index : -1
        )
        .filter((index) => index !== -1);

      if (arrivedProcesses.length === 0) {
        schedule[currentMomentOfExecution] = ChartBoxEnum.Empty;
        currentMomentOfExecution++;
        continue;
      }

      const earliestDeadlineIndex: number = this.getEarliestDeadlineProcess(
        _processes,
        arrivedProcesses
      );

      currentProcess = _processes[earliestDeadlineIndex];

      processIterations = Math.min(currentProcess.executionTime, quantum);
      for (let i = 0; i < processIterations; i++) {
        if ((currentProcess.deadline as number) >= currentMomentOfExecution) {
          schedule[currentMomentOfExecution] = currentProcess.id;
        } else {
          schedule[currentMomentOfExecution] = currentProcess.id + 0.1;
        }
        currentProcess.executionTime -= 1;
        currentMomentOfExecution++;
      }

      //overhead
      if (currentProcess.executionTime !== 0) {
        for (let i = 0; i < overheadTime; i++) {
          schedule[currentMomentOfExecution] = -1;
          currentMomentOfExecution++;
        }
      } else {
        _processes.splice(earliestDeadlineIndex, 1);
      }
    }

    return schedule;
  }

  private getEarliestDeadlineProcess(
    processes: IProcess[],
    arrivedProcesses: number[]
  ): number {
    let earliestDeadline: number = arrivedProcesses.reduce(
      (minIndex, index) => {
        return (processes[minIndex].deadline as number) <
          (processes[index].deadline as number)
          ? minIndex
          : index;
      },
      0
    );
    return earliestDeadline;

    // let earliestDeadline: number = Infinity;
    // let earliestDeadlineIndex: number = -1;

    // for (let i = 0; i < arrivedProcesses.length; i++) {
    //   let process: IProcess = processes[arrivedProcesses[i]];
    //   let deadline: number = (process.deadline as number) + process.arrivalTime;
    //   if (deadline < earliestDeadline) {
    //     earliestDeadline = deadline;
    //     earliestDeadlineIndex = arrivedProcesses[i];
    //   }
    // }

    // return earliestDeadlineIndex;
  }

  private overHeadNumber(num: number): number {
    let str: string = num.toString();

    let power: number = Math.pow(10, str.length);

    let result: number = num / power;
    return result;
  }
}
