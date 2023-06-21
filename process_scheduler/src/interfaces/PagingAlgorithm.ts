import PaginationData from "./PaginationData";

export default interface PagingAlgorithm {
  run(schedule: number[]): PaginationData[];
}
