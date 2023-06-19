import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";

function getProcessIndex(processId: number, processes: Process[]) {
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].id == processId) {
      return i;
    }
  }

  return -1;
}

class RotatingQueue {
  private queue: number[];

  constructor() {
    this.queue = [];
  }

  get(): number {
    if (this.queue.length > 0) {
      return this.queue[0];
    } else {
      return -1;
    }
  }

  rotate(): void {
    if (this.queue.length > 0) {
      const firstElement = this.queue.shift();
      if (firstElement) {
        this.queue.push(firstElement);
      }
    }
  }

  public addElements(elements: number[]): void {
    const uniqueElements = elements.filter(
      (element) => !this.queue.includes(element)
    );
    this.queue.push(...uniqueElements);
  }

  public remove(elementToRemove: number) {
    this.queue = this.queue.filter((element) => element !== elementToRemove);
  }
}

export const roundRobinScheduler: Scheduler = (
  processes: Process[],
  quantum: number = 2,
  overheadTime: number = 1
) => {
  let schedule: number[] = [];
  let currentProcess: Process;
  let counter: number = 0;
  let processIterations: number = 0;
  let processIndex: number = -1;
  let lastProcessEnded: boolean = false;

  let queue: RotatingQueue = new RotatingQueue();

  while (processes.length !== 0) {
    const arrivedProcesses = processes
      .filter((process) => process.arrivalTime <= counter)
      .map((process) => process.id);

    queue.addElements(arrivedProcesses);

    if (lastProcessEnded === false) {
      queue.rotate();
    }

    processIndex = getProcessIndex(queue.get(), processes);
    currentProcess = processes[processIndex];

    processIterations = Math.min(currentProcess.executionTime, quantum);
    for (let i = 0; i < processIterations; i++) {
      schedule[counter] = currentProcess.id;
      currentProcess.executionTime -= 1;
      counter++;
    }

    //overhead
    if (currentProcess.executionTime !== 0) {
      for (let i = 0; i < overheadTime; i++) {
        schedule[counter] = -1;
        counter++;
      }

      lastProcessEnded = false;
    } else {
      processes.splice(processIndex, 1);
      queue.remove(currentProcess.id);
      lastProcessEnded = true;
    }
  }

  return schedule;
};
