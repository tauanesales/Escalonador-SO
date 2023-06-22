import { useState } from "react";
import Process from "./interfaces/Process";
import Scheduler from "./interfaces/Scheduler";
import {
  SchedulerType,
  SchedulerFactory
} from "./schedulers";

interface GanttChartInput {
  processes:Process[],
  schedulerType:SchedulerType
}

function GanttChart ({processes,schedulerType}:GanttChartInput){
  const [schedule, setSchedule] = useState<number[]>([]);
  const scheduler: Scheduler = SchedulerFactory.createScheduler(schedulerType)


  // Execute the selected scheduler
  function executeScheduler():void {
      setSchedule(scheduler.schedule(processes))
  }

  return (
    <div>
      <button onClick={executeScheduler}>Execute {schedulerType} Scheduler</button>
      <div className="gantt-chart">
        {schedule}
      </div>
    </div>
  );

};



export default GanttChart;
