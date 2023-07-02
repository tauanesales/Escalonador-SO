export interface IConditions {
  method: "fifo" | "rr" | "sjf" | "edf";
  pagination: "fifo" | "lru";
  quantum: number;
  sobrecarga: number;
}
