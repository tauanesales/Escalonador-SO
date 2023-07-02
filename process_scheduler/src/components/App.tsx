import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import InputsAndMethods from "./ConditionsSection/InputsAndMethods";
import CreateProcesses from "./ProcessCreationSection/CreateProcesses";
import FrontGanttChart from "./ChartSection/FrontGanttChart";
import MainMemory from "./MemoryAbstraction/RAM/MainMemory";
import Disk from "./MemoryAbstraction/Disk/Disk";
import "./App.css";

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}
const App: React.FC = () => {
  
 const [processData, setProcessData] = useState<ProcessData[]>([]);
 const handleProcessDataChange = (data: ProcessData[]) => {
  setProcessData(data);
  };

  function handleClick(){
    console.log(processData);

  }
  return (
    <div className="App column">
      <img src={logo} alt="Logo" className="logo" />
      <InputsAndMethods />
      <CreateProcesses onDataChange={handleProcessDataChange} />
      <FrontGanttChart processData={processData} />
      <button onClick={handleClick}>sirí</button>
      <MainMemory />
      <Disk />
    </div>
  );
};

export default App;
