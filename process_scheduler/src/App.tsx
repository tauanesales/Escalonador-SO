import React, { useState } from "react";
import Process from "./interfaces/Process";
import GanttChart from "./GanttChart"

// Define the App component
const App: React.FC = () => {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, burstTime: 5 },
    { id: 2, arrivalTime: 2, burstTime: 3 },
    { id: 3, arrivalTime: 4, burstTime: 2 },
    { id: 4, arrivalTime: 6, burstTime: 4 },
    { id: 5, arrivalTime: 8, burstTime: 4 },
  ];

  return (
    <div className="App">
      <h1>Gantt Process Scheduler</h1>
      <GanttChart processes={processes} scheduler="FIFO" />
    </div>
  );
};

export default App;
