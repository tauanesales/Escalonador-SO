export default interface MemoryInterface {
  get storageLeft(): number;
  get storage(): number[];
  store(processId: number, numPages: number): void;
  release(processId: number, numPages: number): void;
}
