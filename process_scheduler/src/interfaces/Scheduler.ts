import { IProcess } from "./Process";

export default interface Scheduler {
  schedule(
    processes: IProcess[],
    quantum?: number,
    overheadTime?: number
  ): number[];
}
