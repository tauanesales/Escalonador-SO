import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import InputsAndMethods from "./ConditionsSection/InputsAndMethods";
import CreateProcesses from "./ProcessCreationSection/CreateProcesses";
import FrontGanttChart from "./ChartSection/FrontGanttChart";
import "./App.css";

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}
const App: React.FC = () => {
  
 const [processArray, setProcessArray] = useState<ProcessData[]>([]);

  function handleClick(){
    console.log(processArray);

  }
  return (
    <div className="App column">
      <img src={logo} alt="Logo" className="logo" />
      <InputsAndMethods />
      <CreateProcesses processArray={processArray} setProcessArray={setProcessArray} />
      <FrontGanttChart processArray={processArray} />
      <button onClick={handleClick}>sirí</button>
    </div>
  );
};

export default App;
