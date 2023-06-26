import Scheduler from "../interfaces/Scheduler";
import FIFOScheduler from "./fifo";
import EDFScheduler from "./edf";
import SJFScheduler from "./sjf";
import RoundRobinScheduler from "./roundRobin";

export enum SchedulerType {
  FIFO = "FIFO",
  SJF = "SJF",
  RoundRobin = "RR",
  EDF = "EDF",
}

export class SchedulerFactory {
  static createScheduler(type: SchedulerType): Scheduler {
    switch (type) {
      case SchedulerType.FIFO:
        return new FIFOScheduler();
      case SchedulerType.SJF:
        return new SJFScheduler();
      case SchedulerType.RoundRobin:
        return new RoundRobinScheduler();
      case SchedulerType.EDF:
        return new EDFScheduler();
      default:
        throw new Error("Invalid scheduler type");
    }
  }
}
