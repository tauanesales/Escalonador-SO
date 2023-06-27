import React, { useState } from "react";
import "./CreateProcesses.css";
import Process from "./Process";

interface CreateProcessesProps {
  processArray: ProcessData[];
  setProcessArray: (data: ProcessData[]) => void;
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}

const CreateProcesses: React.FC<CreateProcessesProps> = ({ processArray, setProcessArray }) => {
  const [customElements, setCustomElements] = useState<JSX.Element[]>([]);
  const [elementCounter, setCounter] = useState<number>(0);

  const deleteProcess = (index: number) => {
    const updatedElements = customElements.filter((_, i) => i !== index);
    setCustomElements(updatedElements);

    if (updatedElements.length === 0) {
      setCounter(0);
    }

    const updatedProcessData = processArray.filter((_, i) => i !== index);
    setProcessArray(updatedProcessData);
  };

  const addProcess = () => {
    const newElement = (
      <Process
        key={elementCounter}
        index={elementCounter}
        processArray={processArray}
        setProcessArray={setProcessArray}
      />
    );
    setCustomElements([...customElements, newElement]);
    
    const newProcessData: ProcessData = {
      processName: elementCounter.toString(),
      executionTime: 0,
      deadline: 0,
      numPages: 0,
      arrivalTime: 0,
    };
    
    setProcessArray([...processArray, newProcessData]);
    setCounter(elementCounter + 1);
  };

  // const handleProcessDataChange = (index: number, updatedData: ProcessData) => {
  //   // Update a specific element in the array by index

  //   console.log("Outside", index, updatedData, processArray);
  //   const updatedProcessData = processArray.map((data, i) => {
  //     if (Number(i) === Number(index)) {
  //       return updatedData;
  //     }
  //     return data;
  //   });
  //   console.log(updatedProcessData);

  //   setProcessArray(updatedProcessData);
  // };

  const logProcessData = () => {
    console.log(processArray);
  };

  return (
    <div>
      {processArray.map((data, index) => {
        return data.toString();
      })}

      <button
        className="box align-items-center center button green"
        onClick={() => {
          addProcess();
        }}
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
