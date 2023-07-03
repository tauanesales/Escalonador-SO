export interface IProcess {
  id: number;
  arrivalTime: number;
  executionTime: number;
  deadline?: number;
  numPages: number;
}
