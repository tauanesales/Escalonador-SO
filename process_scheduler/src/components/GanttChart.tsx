import { useState } from "react";
import Process from "../interfaces/Process";
import Scheduler from "../interfaces/Scheduler";
import { SchedulerType, SchedulerFactory } from "../schedulers";

interface GanttChartInput {
  classNameParam: string;
  processes: Process[];
  schedulerType: SchedulerType;
}

function GanttChart({
  classNameParam,
  processes,
  schedulerType,
}: GanttChartInput) {
  const [schedule, setSchedule] = useState<number[]>([]);
  console.log(schedule);
  const scheduler: Scheduler = SchedulerFactory.createScheduler(schedulerType);

  // Execute the selected scheduler
  function executeScheduler(): void {
    setSchedule(scheduler.schedule(processes));
  }
  
  return (
    <div>
      <button className={classNameParam} onClick={executeScheduler}>
        {schedulerType}
      </button>
    </div>
  );
}

export default GanttChart;
