import short from "short-uuid";
import { IProcess } from "../interfaces/Process";

export function generateId(processes: { [key: string]: IProcess }) {
  let id: short.SUUID;
  do {
    id = short.generate();
  } while (id in processes);
  return id;
}
