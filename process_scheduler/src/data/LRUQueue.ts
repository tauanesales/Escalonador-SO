export default class LRUQueue {
  private queue: number[];

  constructor() {
    this.queue = [];
  }

  get lru(): number {
    return this.queue[0];
  }

  public shift(): number | undefined {
    return this.queue.shift();
  }

  public updateProcess(processId: number): void {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i] === processId) {
        this.queue.splice(i, 1);
        break;
      }
    }

    this.queue.push(processId);
  }
}
