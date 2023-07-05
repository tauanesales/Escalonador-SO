import { IProcess } from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";
import ChartBoxEnum from "../components/ChartSection/ChartBoxEnum";

class FIFOScheduler implements Scheduler {
  public schedule(processes: IProcess[]): number[] {
    const processesQueue: IProcess[] = [...processes]
      .map((obj) => Object.assign({}, obj))
      .sort((p1, p2) => p1.arrivalTime - p2.arrivalTime);

    let schedule: number[] = [];
    let currentProcess: IProcess;
    let currentMomentOfExecution: number = 0;

    while (processesQueue.length !== 0) {
      currentProcess = processesQueue.shift() as IProcess;

      while (currentProcess.arrivalTime > currentMomentOfExecution) {
        schedule[currentMomentOfExecution] = ChartBoxEnum.Empty;
        currentMomentOfExecution++;
      }
      while (currentProcess.executionTime !== 0) {
        schedule[currentMomentOfExecution] = currentProcess.id;
        currentProcess.executionTime -= 1;
        currentMomentOfExecution++;
      }
    }

    return schedule;
  }
}

export default FIFOScheduler;
