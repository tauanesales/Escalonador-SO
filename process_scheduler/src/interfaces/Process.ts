export default interface Process {
  id: number;
  arrivalTime: number;
  executionTime: number;
  deadline?: number;
  numPages: number;
}
