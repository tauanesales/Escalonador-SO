import React, { useEffect, useState } from "react";
import InputsAndMethods from "./ConditionsSection/InputsAndMethods";
import FrontGanttChart from "./ChartSection/FrontGanttChart";
import MemoriesComponent from "./MemoryAbstraction/MemoriesComponent";
import "./App.css";
import { IProcess } from "../interfaces/Process";
import { IConditions } from "../interfaces/Conditions";
import { SchedulerFactory, SchedulerType } from "../schedulers";
import Scheduler from "../interfaces/Scheduler";
import CreateProcesses from "./ProcessCreationSection/CreateProcesses";

const INITIAL_CONDITIONS: IConditions = {
  method: "FIFO",
  pagination: "fifo",
  quantum: 3,
  sobrecarga: 1,
  intervalo: 125,
};

const App: React.FC = () => {
  const [processes, setProcesses] = useState<{ [key: string]: IProcess }>({});
  const [conditions, setConditions] = useState<IConditions>(INITIAL_CONDITIONS);
  const [schedule, setSchedule] = useState<number[]>([]);
  const [save, setSave] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(true);
  const [play, setPlay] = useState<boolean>(true);
  // const processList : IProcess[]= [
  //   { id: 1, arrivalTime: 0, executionTime: 10, deadline: 20, numPages: 4 },
  //   { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
  //   { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 3 },
  //   { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 4 },
  //   { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  // ];

  const processList = Object.values(processes);

  useEffect(() => {
    if (processList.length > 0) {
      const schedulerType: string = conditions.method;
      const createdScheduler: Scheduler = SchedulerFactory.createScheduler(
        schedulerType as SchedulerType
      );
      const createdSchedule = createdScheduler.schedule(
        processList,
        conditions.quantum,
        conditions.sobrecarga
      );

      setSchedule(createdSchedule);
      console.log("CreatedSchedule", createdSchedule);
      setTimeout(() => {
        setPlay(!play);
      }, 500);
    }
  }, [save]);

  function handleRun() {
    setReset(!reset);
    setSave(!save);
    // console.log(schedule);
    (document.getElementById("button__run") as HTMLInputElement).disabled =
      true;
  }
  function handleReset() {
    setReset(!reset);
    (document.getElementById("button__reset") as HTMLInputElement).disabled =
      true;
    (document.getElementById("button__run") as HTMLInputElement).disabled =
      false;
	document.getElementById("chart__turnaround").style.color = "white";
	document.getElementsByClassName("methods__form__wrapper")[0].scrollIntoView();
  }

  return (
    <div className="column main__window">
      <div className="main__header">
        <InputsAndMethods
          conditions={conditions}
          setConditions={setConditions}
        />
        <CreateProcesses processes={processes} setProcesses={setProcesses} />
      </div>
	  <div id="buttons">
		<button id="button__run" onClick={handleRun}>
			Run
		</button>
		<button id="button__reset" onClick={handleReset}>
			Reset
		</button>
	  </div>
      <FrontGanttChart
        processList={processList}
        conditions={conditions}
        schedule={schedule}
        play={play}
        reset={reset}
      />
      <MemoriesComponent
        processList={processList}
        conditions={conditions}
        schedule={schedule}
        play={save}
        reset={reset}
      />
    </div>
  );
};

export default App;
