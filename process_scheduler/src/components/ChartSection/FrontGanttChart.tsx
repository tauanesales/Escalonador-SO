import React, { useEffect, useState } from "react";
import "./FrontGanttChart.css";
import { IProcess } from "../../interfaces/Process";
import ChartBox from "./ChartBox";
import { IConditions } from "../../interfaces/Conditions";

interface FrontGanttChartProps {
  processList: IProcess[];
  conditions: IConditions;
  schedule: number[];
  play: boolean;
}

const FrontGanttChart: React.FC<FrontGanttChartProps> = ({ conditions, processList, schedule, play }) => {

  const [matrix, setMatrix] = useState<number[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const [turnaround, setTurnaround] = useState<number>();


  const handleClick= ()=>{
   
    console.log(conditions);
    console.log(schedule);
    console.log(processList);
  };
  const handleReset= () =>{
    setColumns([]);
  };

  function create_matrix() {
    const newmatrix: number[][] = [];
    const last_index_list = schedule.map((_currentElement, index) => {
      return schedule.lastIndexOf(index + 1);
    });
    let last_element = 0;
    // -1 = switching ,0 = hidden, 1 = waiting, 2 = processing,
    for (let i = 0; i < schedule.length; i++) {
      newmatrix[i] = [];
      for (let j = 0; j < processList.length; j++) {
        if (schedule[i] == j + 1) {
          newmatrix[i][j] = 2;
          last_element = schedule[i];
        } else if (schedule[i] == -1 && j == last_element - 1) {
          newmatrix[i][j] = -1;
        } else if (i >= processList[j].arrivalTime && i <= last_index_list[j]) {
          newmatrix[i][j] = 1;
        } else {
          newmatrix[i][j] = 0;
        }
      }
    }
    setMatrix(newmatrix);
  }

  function renderColumn() {
    const newColumns: JSX.Element[] = [];
    const hiddenBox = <ChartBox boxType="hidden-box" />;
    const switchBox = <ChartBox boxType="switch-box" />;
    const waitBox = <ChartBox boxType="wait-box" />;
    const processingBox = <ChartBox boxType="processing-box" />;

    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const renderAsync = async () => {
      for (let current_time = 0; current_time < matrix.length; current_time++) {
        const column = matrix[current_time].reduce(
          (accumulator: JSX.Element, proc, _process_index) => {
            switch (proc) {
              case -1:
                return (
                  <>
                    {accumulator}
                    {switchBox}
                  </>
                );
              case 0:
                return (
                  <>
                    {accumulator}
                    {hiddenBox}
                  </>
                );
              case 1:
                return (
                  <>
                    {accumulator}
                    {waitBox}
                  </>
                );
              default:
                return (
                  <>
                    {accumulator}
                    {processingBox}
                  </>
                );
            }
          },
          <></>
        );

        newColumns.push(
          <div key={current_time} className="chart__column">
            {column}
          </div>
        );
        setColumns([...newColumns]);

        await delay(conditions.intervalo);
      }
    };

    renderAsync();
  }
  
  function calculateTurnaround(){
    setTurnaround(processList.reduce( (accumulator: number , process)=> {
      console.log(schedule.lastIndexOf(process.id)+1, "-", process.arrivalTime) ;
      return accumulator += (schedule.lastIndexOf(process.id)+1-process.arrivalTime);
    }, 0)/processList.length)
    
  }

  useEffect(() => {
    console.log(schedule);
    if (schedule.length > 0) {
      calculateTurnaround();
      create_matrix();
    }
  }, [schedule]);

  useEffect( () => {
    renderColumn();
  }, [play])
  return (
    <div className="box chart">
      <button onClick={handleReset}>Reset</button> <br/>
      <button onClick={handleClick}>Logs</button>
      <p>turnaround: {turnaround}</p>
      <br />
      <div className="chart__wrapper">{columns}</div>
    </div>
  );
};

export default FrontGanttChart;
