import { IProcess } from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";
import ChartBoxEnum from "../components/ChartSection/ChartBoxEnum";

export default class SJFScheduler implements Scheduler {
  public schedule(processes: IProcess[]): number[] {
    let _processes: IProcess[] = [...processes].map((process) =>
      Object.assign({}, process)
    );
    let schedule: number[] = [];
    let currentProcess: IProcess;
    let currentMomentOfExecution: number = 0;

    while (_processes.length !== 0) {
      const arrivedProcesses: number[] = _processes
        .map((process, index) =>
          process.arrivalTime <= currentMomentOfExecution ? index : -1
        )
        .filter((index) => index !== -1); // vai retornar os index dos processos que chegaram

      if (arrivedProcesses.length === 0) {
        schedule[currentMomentOfExecution] = ChartBoxEnum.Empty;
        currentMomentOfExecution++;
        continue;
      }

      const shortestProcessIndex: number = this.getShortestProcess(
        _processes,
        arrivedProcesses
      );
      currentProcess = _processes[shortestProcessIndex];

      while (currentProcess.executionTime !== 0) {
        schedule[currentMomentOfExecution] = currentProcess.id;
        currentProcess.executionTime -= 1;
        currentMomentOfExecution++;
      }

      _processes.splice(shortestProcessIndex, 1);
    }

    return schedule;
  }

  private getShortestProcess(
    processes: IProcess[],
    arrivedProcesses: number[] // todos os index dos processos que chegaram
  ): number {
    let smallestExecutionTime: number = Infinity; // menor tempo de execucao
    let shortestProcessIndex: number = -1; // index
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
