import Process from "./Process";

export default interface Scheduler{
    schedule(processes: Process[], quantum?:number, overheadTime?:number): number[];
}