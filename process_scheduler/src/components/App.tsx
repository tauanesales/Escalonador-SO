import React, { useState } from "react";
import Process from "../interfaces/Process";
import { SchedulerType } from "../schedulers";
import GanttChart from "./GanttChart"
import logo from '../assets/img/logo.png';
import "./App.css";

// Define the App component
const App: React.FC = () => {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline:20, numPages:2 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline:17, numPages:2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline:8 , numPages:2},
    { id: 4, arrivalTime: 6, executionTime: 4, deadline:10, numPages:2 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline:5 , numPages:2},
  ];

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    
    <div className="App">
       <button className="button">
       <h1>Selecione o Algoritmo desejado</h1>
       </button>
       <div>
      <input
        className="sobrecarga"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <input
        className="quantum"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p className="quantum2">Quantum : {inputValue}</p>
      <p className="sobrecarga2">Sobrecarga : {inputValue}</p>
    </div>
    <div className="button-container">
         <GanttChart classNameParam="button1" processes={processes} schedulerType={SchedulerType.FIFO} />
         <GanttChart classNameParam="button2" processes={processes} schedulerType={SchedulerType.SJF} />
         <GanttChart classNameParam="button3" processes={processes} schedulerType={SchedulerType.EDF} />
         <GanttChart classNameParam="button4" processes={processes} schedulerType={SchedulerType.RoundRobin} />
    </div>
      <img src={logo} alt="Logo" className="logo" />
      <button className="buttonVerde">
           <h1>Criar processo</h1>
       </button>
    </div>
  );
};

export default App;
