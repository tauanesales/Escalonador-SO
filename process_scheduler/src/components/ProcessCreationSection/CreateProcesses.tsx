import React, { useState } from "react";
import "./CreateProcesses.css";
import Process from "./Process";

interface CreateProcessesProps {
  onDataChange: (data: ProcessData[]) => void;
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}

const CreateProcesses: React.FC<CreateProcessesProps> = ({ onDataChange }) => {
  const [customElements, setCustomElements] = useState<JSX.Element[]>([]);
  const [elementCounter, setCounter] = useState<number>(1);
  const [processData, setProcessData] = useState<ProcessData[]>([]);

  const deleteProcess = (index: number) => {
    const updatedElements = customElements.filter((_, i) => i !== index);
    setCustomElements(updatedElements);

    if (updatedElements.length === 0) {
      setCounter(1);
    }

    const updatedProcessData = processData.filter((_, i) => i !== index);
    setProcessData(updatedProcessData);
    onDataChange(updatedProcessData); // Notify the parent component about the updated data
  };

  const addProcess = () => {
    const newElement = (
      <Process
        key={customElements.length}
        index={elementCounter}
        onDataChange={handleProcessDataChange} // Pass the callback function
      />
    );
    setCustomElements([...customElements, newElement]);
    setCounter(elementCounter + 1);
    setProcessData([...processData, {}]);
  };

  const handleProcessDataChange = (index: number, updatedData: ProcessData) => {
    const updatedProcessData = [...processData];
    updatedProcessData[index] = updatedData; // Assign the updated data directly
    setProcessData(updatedProcessData);
    onDataChange(updatedProcessData); // Notify the parent component about the updated data
  };

  const logProcessData = () => {
    console.log(processData);
  };

  return (
    <div>
      {processData.toString()}
      <button
        className="box align-items-center center button green"
        onClick={addProcess}
      >
        Criar Processo
      </button>
      {customElements.length > 0 ? (
        <div id="process-box column" className="large-box row">
          {customElements.map((element, index) => (
            <div key={index}>
              <button
                className="close-btn small-text center align-items-center pm-0"
                onClick={() => deleteProcess(index)}
              >
                ✖
              </button>
              {element}
            </div>
          ))}
        </div>
      ) : null}
      <button onClick={logProcessData}>Log Process Data</button>
    </div>
  );
};

export default CreateProcesses;
