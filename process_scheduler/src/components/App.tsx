import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import InputsAndMethods from "./ConditionsSection/InputsAndMethods";
import CreateProcesses from "./ProcessCreationSection/CreateProcesses";
import FrontGanttChart from "./ChartSection/FrontGanttChart";
import "./App.css";
import { IProcess } from "../interfaces/Process";
import { IConditions } from "../interfaces/Conditions";

const INITIAL_CONDITIONS: IConditions = {
  method: "fifo",
  pagination: "fifo",
  quantum: 0,
  sobrecarga: 0,
};

const App: React.FC = () => {
  const [processes, setProcesses] = useState<{ [key: string]: IProcess }>({});
  const [conditions, setConditions] = useState<IConditions>(INITIAL_CONDITIONS);

  const processList = Object.values(processes);

  return (
    <div className="column">
      <img src={logo} alt="Logo" className="logo" />
      <InputsAndMethods conditions={conditions} setConditions={setConditions} />
      <CreateProcesses processes={processes} setProcesses={setProcesses} />
      <FrontGanttChart processList={processList} conditions={conditions} />
    </div>
  );
};

export default App;
