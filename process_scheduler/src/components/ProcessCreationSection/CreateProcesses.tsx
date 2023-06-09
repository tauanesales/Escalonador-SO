import React, { useEffect } from "react";
import "./CreateProcesses.css";
// import { generateId } from "../../helper/generateId";
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
  executionTime: 1,
  numPages: 1,
};

const CreateProcesses: React.FC<CreateProcessesProps> = ({
  processes,
  setProcesses,
}) => {
  const createProcess = (process: IProcess) => {
    // const id = generateId(processes);
    const id = Object.values(processes).length + 1;
    // console.log(Object.values(processes));
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
    const newProcesses: any = { ...processes };
    newProcesses[processId] = {
      ...newProcesses[processId],
      [key]: value,
    };
    setProcesses(newProcesses);
  };

  const deleteProcess = (processId: string | undefined) => {
    if (!processId) return;
    let tmpProcesses = { ...processes };
    delete tmpProcesses[processId];
    let i = 1;
    let newProcesses: { [key: number]: IProcess } = {};
    Object.keys(tmpProcesses).forEach((key) => {
      tmpProcesses[key].id = i;
      newProcesses[i] = tmpProcesses[key];
      i++;
    });
    // console.log(Object.keys(newProcesses));
    setProcesses(newProcesses);
  };

  useEffect(() => {
    if (Object.keys({ ...processes }).length == 0) {
      createProcess(INITIAL_PROCESS);
    }
  });

  return (
    <section className="create__process">
      <div className="create__process__heading"></div>
      <ol className="process__list">
        <li>
          <button
            onClick={() => createProcess(INITIAL_PROCESS)}
            className="create__process__button"
          >
            Criar processo
          </button>
        </li>
        {Object.values(processes).map((process) => (
          <li key={process.id}>
            <Process
              process={process}
              updateProcess={updateProcess}
              deleteProcess={deleteProcess}
            />
          </li>
        ))}
      </ol>
      <div className="create__process__heading"></div>
    </section>
  );
};

export default CreateProcesses;
