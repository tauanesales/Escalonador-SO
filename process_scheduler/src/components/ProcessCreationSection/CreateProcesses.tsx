import React from "react";
import "./CreateProcesses.css";
import { generateId } from "../../helper/generateId";
import { IProcess } from "../../interfaces/Process";
import Process from "./Process";

interface CreateProcessesProps {
  processes: {
    [key: string]: IProcess;
  };
  setProcesses: React.Dispatch<
    React.SetStateAction<{
      [key: number]: IProcess;
    }>
  >;
  onDataChange?: (data: ProcessData[]) => void;
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
  processArray: IProcess;
}

const INITIAL_PROCESS: IProcess | any = {
  arrivalTime: 0,
  deadline: 0,
  executionTime: 0,
  numPages: 0,
};

const CreateProcesses: React.FC<CreateProcessesProps> = ({ processes, setProcesses }) => {
  const createProcess = (process: IProcess) => {
    const id = generateId(processes);
    const newProcesses = { ...processes };
    newProcesses[id] = { ...process, id };
    setProcesses(newProcesses);
  };

  const updateProcess = (
    processId: string | undefined,
    key: keyof IProcess,
    value: number | undefined
  ) => {
    if (!processId) return;
    const newProcesses = { ...processes };
    newProcesses[processId] = {
      ...newProcesses[processId],
      [key]: value,
    };
    setProcesses(newProcesses);
  };

  const deleteProcess = (processId: string | undefined) => {
    if (!processId) return;
    const newProcesses = { ...processes };
    delete newProcesses[processId];
    setProcesses(newProcesses);
  };

  return (
    <section className="create__process">
      <h2 className="create__process__heading">Processos: </h2>
      <ol className="process__list">
        {Object.values(processes).map((process) => (
          <li key={process.id}>
            <Process
              process={process}
              updateProcess={updateProcess}
              deleteProcess={deleteProcess}
            />
          </li>
        ))}
        <li>
          <button
            onClick={() => createProcess(INITIAL_PROCESS)}
            className="create__process__button"
          >
            Criar processo
          </button>
        </li>
      </ol>
    </section>
  );
};

export default CreateProcesses;