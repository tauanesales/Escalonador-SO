export default class GeneralStorage {
  private _storage: number[];
  private storageSize: number;

  constructor(storageSize: number, pageSize: number) {
    this.storageSize = storageSize / pageSize;
    this._storage = [];
  }

  get storageLeft(): number {
    return this.storageSize - this._storage.length;
  }

  get storage(): number[] {
    return this._storage;
  }

  public store(processId: number, numPages: number): void {
    let newSize = numPages + this._storage.length;
    if (newSize <= this.storageSize) {
      for (let i = this._storage.length; i < newSize; i++) {
        this._storage[i] = processId;
      }
    }else{
      console.log("not enough space in Disk, storageLeft:" + this.storageLeft)
    }
  }

  public release(processId: number, numPages: number): void {
    let newSize: number = this._storage.length - numPages;
    if (newSize >= 0) {
      let result: number[] = [];
      let removedCount: number = 0;
      let len: number = this.storage.length;
      let currItem: number;
      for (let i = 0; i < len; i++) {
        currItem = this._storage[i];
        if (currItem !== processId || removedCount == numPages) {
          result.push(currItem);
        } else {
          removedCount++;
        }
      }

      this._storage = result;
    }
  }
}
