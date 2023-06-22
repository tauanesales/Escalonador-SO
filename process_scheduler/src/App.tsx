import React, { useState } from "react";
import Process from "./interfaces/Process";
import { SchedulerType } from "./schedulers";
import GanttChart from "./GanttChart"

// Define the App component
const App: React.FC = () => {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline:20, numPages:2 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline:17, numPages:2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline:8 , numPages:2},
    { id: 4, arrivalTime: 6, executionTime: 4, deadline:10, numPages:2 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline:5 , numPages:2},
  ];

  return (
    <div className="App">
      <h1>Gantt Process Scheduler</h1>
      <GanttChart processes={processes} schedulerType={SchedulerType.FIFO} />
      <GanttChart processes={processes} schedulerType={SchedulerType.SJF} />
      <GanttChart processes={processes} schedulerType={SchedulerType.EDF} />
      <GanttChart processes={processes} schedulerType={SchedulerType.RoundRobin} />
    </div>
  );
};

export default App;
