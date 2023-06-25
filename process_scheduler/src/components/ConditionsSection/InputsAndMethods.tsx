import React, { useState } from "react";
import { SchedulerType } from "../../schedulers";
import Process from "../../interfaces/Process";
import GanttChart from "../GanttChart";

const InputsAndMethods: React.FC = () => {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 2 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 2 },
    { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 2 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  ];

  const [quantum, setQuantumValue] = useState(4);

  const [sobrecarga, setSobrecargaValue] = useState(1);

  const handleQuantumChange = (e: any) => {
    setQuantumValue(e.target.value);
  };
  const handleSobrecargaChage = (e: any) => {
    setSobrecargaValue(e.target.value);
  };

  return (
    <div>
      <div className="row wrap align-items-start">
        <div className="column flex-grow yellow box mw-200">
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
          <div className="row between">
            <p className="box">Quantum:</p>
            <input
              className="box"
              type="text"
              value={quantum}
              onChange={handleQuantumChange}
            />
          </div>

          <div className="row between">
            <p className="box">Sobrecarga:</p>
            <input
              className="box"
              type="text"
              value={sobrecarga}
              onChange={handleSobrecargaChage}
            />
          </div>
          <div className="row between center align-items-center">
            <p className="box">Paginação:</p>
            <div className="row evenly flex-grow">
              <div className="align-items-center center">
                <input
                  type="radio"
                  id="FIFO"
                  name="tipo_escalonamento_paginas"
                  value="FIFO"
                  checked
                />
                <label htmlFor="FIFO">FIFO</label>
              </div>
              <div className="align-items-center center">
                <input
                  type="radio"
                  id="LRU"
                  name="tipo_escalonamento_paginas"
                  value="LRU"
                />
                <label htmlFor="LRU">LRU</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputsAndMethods;
