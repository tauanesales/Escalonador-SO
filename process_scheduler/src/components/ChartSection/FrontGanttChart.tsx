import React from "react";
import ProcessRow from "./ProcessRow";
import "./FrontGanttChart.css";

interface FrontGanttChartProps {
  processData: ProcessData[];
}

interface ProcessData {
  processName: string;
  executionTime: number;
  deadline: number;
  numPages: number;
  arrivalTime: number;
}

const FrontGanttChart: React.FC<FrontGanttChartProps> = ({ processData }) => {
  function handleClick() {
    console.log(processData);
  }

  return (
    <div className="box chart">
      <ProcessRow processName="P1" />
      <button onClick={handleClick}>macaco</button>
    </div>
  );
};

export default FrontGanttChart;