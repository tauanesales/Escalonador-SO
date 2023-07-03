export interface IConditions {
  method: "FIFO" | "RR" | "SJF" | "EDF";
  pagination: "fifo" | "lru";
  quantum: number;
  sobrecarga: number;
  intervalo: number;
}
