import React from "react";
import logo from "../assets/img/logo.png";
import InputsAndMethods from "./InputsAndMethods";
import CreateProcesses from "./CreateProcesses";
import FrontGanttChart from "./FrontGanttChart";
import "./App.css";

// Define the App component
const App: React.FC = () => {
  return (
    <div className="App column">
      <img src={logo} alt="Logo" className="logo" />
      <InputsAndMethods />
      <CreateProcesses />
      <FrontGanttChart />
    </div>
  );
};

export default App;
