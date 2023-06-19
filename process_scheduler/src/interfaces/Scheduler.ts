import Process from "./Process";

export default interface Scheduler{
    (processes: Process[]): number[];
}