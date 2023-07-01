import React, { useState, useEffect } from "react";
import "./Process.css";

interface ProcessProps {
  index: number;
  processArray: ProcessData[];
  setProcessArray: (data: ProcessData[]) => void;
  onDataChange: (index: number, updatedData: ProcessData) => void;
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}

const Process: React.FC<ProcessProps> = (props) => {
  const { index, processArray, setProcessArray} = props;
  const [processData, setProcessData] = useState<ProcessData>({
    processName: index.toString(),
    executionTime: 0,
    deadline: 0,
    numPages: 0,
    arrivalTime: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProcessData: ProcessData = { ...processData, [name]: parseInt(value) };
    console.log(index, updatedProcessData);
    setProcessData(updatedProcessData); // Update the state
    setProcessArray(processArray.map((process, i) => (i === index - 1 ? updatedProcessData : process)));
  };

  return (
    <div className="box yellow between column">
      <input
        className="box"
        type="text"
        name="processName"
        value={processData.processName}
        onChange={handleInputChange}
      />
      <div className="row between align-items-center wrap">
        <div className="row flex-grow between p-5">
          <div>Tempo:</div>
          <input
            className="mw-50"
            type="number"
            name="executionTime"
            value={processData.executionTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="row flex-grow between p-5">
          <div>Deadline:</div>
          <input
            className="mw-50"
            type="number"
            name="deadline"
            value={processData.deadline}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row between align-items-center wrap">
        <div className="row flex-grow between p-5">
          <div>Páginas:</div>
          <input
            className="mw-50"
            type="number"
            name="numPages"
            value={processData.numPages}
            onChange={handleInputChange}
          />
        </div>
        <div className="row flex-grow between p-5">
          <div>Chegada:</div>
          <input
            className="mw-50"
            type="number"
            name="arrivalTime"
            value={processData.arrivalTime}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Process;
