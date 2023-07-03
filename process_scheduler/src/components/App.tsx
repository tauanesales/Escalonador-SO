import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import InputsAndMethods from "./ConditionsSection/InputsAndMethods";
import FrontGanttChart from "./ChartSection/FrontGanttChart";
import MemoriesComponent from "./MemoryAbstraction/MemoriesComponent";
import "./App.css";
import { IProcess } from "../interfaces/Process";
import { IConditions } from "../interfaces/Conditions";
import { SchedulerFactory, SchedulerType }  from "../schedulers";
import Scheduler from "../interfaces/Scheduler";

const INITIAL_CONDITIONS: IConditions = {
  method: "FIFO",
  pagination: "fifo",
  quantum: 3,
  sobrecarga: 1,
  intervalo: 125
};

const App: React.FC = () => {
//  const [processes, setProcesses] = useState<{ [key: string]: IProcess }>({});
  const [conditions, setConditions] = useState<IConditions>(INITIAL_CONDITIONS);
  const [schedule, setSchedule] = useState<number[]>([]);
  const [play, setPlay] = useState<boolean>(true);
  const processList : IProcess[]= [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 4 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 3 },
    { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 4 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  ];

  
 // const processList = Object.values(processes);

 useEffect(() => {
  if (processList.length > 0) {
    const schedulerType: string = conditions.method;
    const createdScheduler: Scheduler = SchedulerFactory.createScheduler(schedulerType as SchedulerType);
    const createdSchedule = createdScheduler.schedule(processList, conditions.quantum, conditions.sobrecarga);
     setSchedule(createdSchedule);
  }
}, [conditions.method, conditions.quantum, conditions.sobrecarga]);
  function handleClick(){
    console.log(schedule);
    
    setPlay(!play);
  }
  return (
    <div className="column">
      <img src={logo} alt="Logo" className="logo" />
      <InputsAndMethods conditions={conditions} setConditions={setConditions} />
      <button onClick={handleClick}>macaco</button>
      {/*<CreateProcesses processes={processes} setProcesses={setProcesses} />*/}
      <FrontGanttChart processList={processList} conditions={conditions} schedule={schedule}  play={play} />
      <MemoriesComponent processList={processList} conditions={conditions} schedule={schedule} play={play}/>
    </div>
  );
};

export default App;
