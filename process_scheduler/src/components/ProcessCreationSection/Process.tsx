import React, { memo } from "react";
import "./Process.css";
import { IProcess } from "../../interfaces/Process";

interface ProcessProps {
  process: IProcess;
  updateProcess: (
    processId: string | undefined,
    key: keyof IProcess,
    value: number | undefined
  ) => void;
  deleteProcess: (processId: string | undefined) => void;
}

const Process: React.FC<ProcessProps> = memo((props) => {
  const { process, updateProcess, deleteProcess } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateProcess(process.id, name as keyof IProcess, parseInt(value));
  };

  return (
    <div className="process__card">
      <header className="process__card__header">
        <h3 className="process__card__heading">
          Cód.: <code>{process.id?.substring(0, 6).toUpperCase()}</code>
        </h3>
        <button
          onClick={() => deleteProcess(process.id)}
          className="process__card__close"
        >
          &#x00D7;
        </button>
      </header>
      <form onSubmit={(e) => e.preventDefault()} className="process__card__fields">
        <label htmlFor="executionTime">
          <p>Tempo:</p>
          <input
            onChange={handleChange}
            type="number"
            id={`executionTime-${process.id}`}
            name={"executionTime" as keyof IProcess}
            value={process.executionTime}
          />
        </label>
        <label htmlFor="deadline">
          <p>Deadline:</p>
          <input
            onChange={handleChange}
            type="number"
            id={`deadline-${process.id}`}
            name={"deadline" as keyof IProcess}
            value={process.deadline}
          />
        </label>
	  </form>
	  <form onSubmit={(e) => e.preventDefault()} className="process__card__fields">
        <label htmlFor="numPages">
          <p>Páginas:</p>
          <input
            onChange={handleChange}
            type="number"
            id={`numPages-${process.id}`}
            name={"numPages" as keyof IProcess}
            value={process.numPages}
          />
        </label>
        <label htmlFor="arrivalTime">
          <p>Chegada:</p>
          <input
            onChange={handleChange}
            type="number"
            id={`arrivalTime-${process.id}`}
            name={"arrivalTime" as keyof IProcess}
            value={process.arrivalTime}
          />
        </label>
      </form>
    </div>
  );
});

export default Process;
