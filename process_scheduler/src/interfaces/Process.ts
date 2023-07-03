export interface IProcess {
  id?: string;
  arrivalTime: number;
  executionTime: number;
  deadline?: number;
  numPages: number;
}
