import React, { useState } from "react";
// import ProcessRow from "./ProcessRow";
import "./FrontGanttChart.css";
import Process from "../../interfaces/Process";
import ChartBox from "./ChartBox";
import "./ChartBox.css";

interface FrontGanttChartProps {
  processData: ProcessData[];
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline?: number;
  numPages: number;
  arrivalTime: number;
}
const FrontGanttChart: React.FC<FrontGanttChartProps> = ({ processData }) => {
  //const [matrix, setMatrix] = useState<JSX.Element[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const interval_time = 0.25;
//  const schedule = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
//  const process_order = [1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 5];
 const schedule = [1, 1, -1, 2, 2, -1, 1, 1, -1, 3, 3, 4, 4, -1, 2, 5, 5, -1, 1, 4, 4, 5, 5];
//  const process_order = [1, 1, -1, 2, 2, -1, 3, 3, 5, 5, -1, 5, 5, 4, 4, -1, 4, 4, 2, 1, 1, -1, 1];

const processes: Process[] = [
  { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 2 },
  { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
  { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 2 },
  { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 2 },
  { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
];

  function handleClick() {
    renderColumn();
    // const newmatrix: JSX.Element[][] = [...columns];
    // const columnIndex = 1
    // const filteredList = newmatrix.map((list) => list.slice(0, columnIndex + 1));
    //setColumns(filteredList)
  }

  function renderColumn() {

    const arrival_time = processes.map((process: Process) => {
      return process.arrivalTime;
    });
  
    const exit_time = processes.map((process, index) => {
      return schedule.lastIndexOf(index + 1);
    });
  
    const newcolumns: JSX.Element[] = schedule.map((curent_process, current_time): JSX.Element => {
      const hidden_box = <ChartBox boxType="hidden-box" />;
      const switch_box = <ChartBox boxType="switch-box" />;
      const wait_box = <ChartBox boxType="wait-box" />;
      const processing_box = <ChartBox boxType="processing-box" />;
      let last_active = 0;

      return processes.reduce((accumulator: JSX.Element, proc, process_index) => {
        if (curent_process === process_index + 1) {
          last_active = process_index+1;
          return <>{accumulator}{processing_box}</>;
        } else if (curent_process === -1 && last_active === process_index+1) {
          return <>{accumulator}{switch_box}</>;
        } else if (current_time >= proc.arrivalTime && current_time <= exit_time[process_index]) {
          return <>{accumulator}{wait_box}</>;
        }else {
          return <>{accumulator}{hidden_box}</>;
        }
      }, <></>);
    });
  
    setColumns(newcolumns);
  }


  // function renderMatrix(){
  //   return processes.map( (process, index) =>{
  //     return <ProcessRow index={index+1} processName={`P${index+1}`} schedule={process_order} process={process} interval_time={interval_time}/>
  //   })

  // }

  return (
    <div className="box chart">
      <button onClick={handleClick}>macaco</button>
      {columns}
    </div>
  );
};

export default FrontGanttChart;