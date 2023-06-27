import { SchedulerFactory, SchedulerType } from "../../schedulers";
import FIFOPageReplacement from "../../paging/fifo";
import Process from "../../interfaces/Process";
import PagingAlgorithm from "../../interfaces/PagingAlgorithm";
import Scheduler from "../../interfaces/Scheduler";
import { useEffect, useState } from "react";
import "./MainMemory.css"; // Importando o arquivo CSS para estilização

function MainMemory() {

    let processes: Process[] = [
      { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 4 },
      { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
      { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 3 },
      { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 4 },
      { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
    ];
    

    console.log("executando o algoritmo de escalonamento de processos FIFO e paginacao LRU");
    console.log("processos input: ");

    let scheduler: Scheduler = SchedulerFactory.createScheduler(SchedulerType.FIFO);
    let schedule = scheduler.schedule(processes);

    console.log("escalonamento fifo:");
    console.log(schedule);

    let ramSize: number = 20;
    let pageSize: number = 4;
    let diskSize: number = 80;

    const fifoPaging: PagingAlgorithm = new FIFOPageReplacement(
      processes,
      ramSize,
      pageSize,
      diskSize
    );

    console.log("paginacao FIFO resultante:");
    const pagingData = fifoPaging.run(schedule);
    console.log(pagingData);
  
    const [currentStep, setCurrentStep] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => (prevStep + 1) % pagingData.length);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const currentRam = pagingData[currentStep]?.ram || [];

  return (
    <div className="main-memory-container">
    <h1>RAM</h1>
    <h3>step {pagingData[currentStep]?.step}</h3>
    <div className="ram-frame">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="memory-cell">
          {currentRam[index] !== undefined ? (
            <div>{currentRam[index]}</div>
          ) : (
            <div>-</div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}

export default MainMemory;
