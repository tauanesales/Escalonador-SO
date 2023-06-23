import React, { useState } from "react";
import "./App.css";
import GanttChart from "./GanttChart";

import Process from "../interfaces/Process";
import { SchedulerType } from "../schedulers";

// Define the InputsAndMethods component
const InputsAndMethods: React.FC = () => {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 2 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 2 },
    { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 2 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  ];

  const [quantum, setQuantumValue] = useState("");

  const [sobrecarga, setSobrecargaValue] = useState("");

  const handleQuantumChange = (e: any) => {
    setQuantumValue(e.target.value);
  };
  const handleSobrecargaChage = (e: any) => {
    setSobrecargaValue(e.target.value);
  };

  return (
    <div>
      <div className="row align-items-start">
        <div className="column flex-grow yellow box mw-300">
          <div className="box">Seleção de Métodos</div>

          <div className="row evenly">
            <GanttChart
              classNameParam="box button blue"
              processes={processes}
              schedulerType={SchedulerType.FIFO}
            />
            <GanttChart
              classNameParam="box button blue"
              processes={processes}
              schedulerType={SchedulerType.RoundRobin}
            />
          </div>

          <div className="row evenly">
            <GanttChart
              classNameParam="box button blue"
              processes={processes}
              schedulerType={SchedulerType.SJF}
            />
            <GanttChart
              classNameParam="box button blue"
              processes={processes}
              schedulerType={SchedulerType.EDF}
            />
          </div>
        </div>

        <div className="column box yellow">
          <div className="row">
            <p className="box">Quantum {quantum}</p>
            <input
              className="box"
              type="text"
              value={quantum}
              onChange={handleQuantumChange}
            />
          </div>

          <div className="row">
            <p className="box">Sobrecarga {sobrecarga}</p>
            <input
              className="box"
              type="text"
              value={sobrecarga}
              onChange={handleSobrecargaChage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputsAndMethods;
