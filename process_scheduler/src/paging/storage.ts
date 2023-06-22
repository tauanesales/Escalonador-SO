export default class GeneralStorage {
  private _storage: number[];
  private storageSize: number;

  constructor(storageSize: number, pageSize: number) {
    this.storageSize = storageSize / pageSize;
    this._storage = new Array(this.storageSize).fill(NaN);
  }

  get storageLeft(): number {
    return this._storage.filter((value) => isNaN(value)).length;
  }

  get storage(): number[] {
    return this._storage;
  }

  public store(processId: number, numPages: number): void {
    let storedCount = 0
    const storageLeft: number = this.storageLeft;
    if (numPages <= storageLeft) {
      for (let i = 0; i <this.storageSize; i++) {
        if (isNaN(this._storage[i])){
          this._storage[i] = processId;
          storedCount++;
        }

        if(storedCount === numPages) break
      }
    } else {
      console.log("not enough space in Disk, storageLeft:" + storageLeft);
    }
  }

  public release(processId: number, numPages: number): void {
    let removedCount:number = 0;
    for (let i = 0; i <this.storageSize; i++) {
      if (this._storage[i] === processId){
        this._storage[i] = NaN;
        removedCount++
      }

      if(removedCount == numPages) break
    }
  }
}
