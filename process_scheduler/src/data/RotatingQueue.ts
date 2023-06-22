export default class RotatingQueue {
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