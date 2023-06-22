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
    const storageLeft: number = this.storageLeft;
    const nanIndexes: number[] = this._storage.reduce(
      (indexes: number[], value: number, index: number) => {
        if (isNaN(value)) {
          indexes.push(index);
        }
        return indexes;
      },
      []
    );

    if (numPages <= storageLeft) {
      let counter: number = 0;
      while (counter < numPages) {
        this._storage[nanIndexes[counter]] = processId;
        counter++;
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
