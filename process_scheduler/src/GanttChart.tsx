import { useState } from "react";
import Process from "./interfaces/Process";
import { fifoScheduler } from "./schedulers";


const GanttChart: React.FC<{ processes: Process[]; scheduler: string }> = ({
    processes,
    scheduler,
  }) => {
    const [timeline, setTimeline] = useState<number[]>([]);
 
    // Execute the selected scheduler
    const executeScheduler = () => {
      switch (scheduler) {
        case "FIFO":
          fifoScheduler(processes);
          break;
        case "SJF":
          // executeSJF();
          break;
        case "Round Robin":
          // executeRoundRobin();
          break;
        case "EDF":
          // executeEDF();
          break;
        default:
          break;
      }
    };
  
    return (
      <div>
        <button onClick={executeScheduler}>Execute {scheduler} Scheduler</button>
        <div className="gantt-chart">
          {timeline.map((processId) => (
            <div key={processId} className="bar">
              Process {processId}
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default GanttChart