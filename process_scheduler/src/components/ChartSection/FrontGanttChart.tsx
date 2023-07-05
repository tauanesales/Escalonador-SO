import React, { useEffect, useState } from "react";
import "./FrontGanttChart.css";
import { IProcess } from "../../interfaces/Process";
import ChartBox from "./ChartBox";
import { IConditions } from "../../interfaces/Conditions";
import ChartBoxEnum from "./ChartBoxEnum";

interface FrontGanttChartProps {
  processList: IProcess[];
  conditions: IConditions;
  schedule: number[];
  play: boolean;
}

const FrontGanttChart: React.FC<FrontGanttChartProps> = ({
  conditions,
  processList,
  schedule,
  play,
}) => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const [turnaround, setTurnaround] = useState<number>();

  const handleClick = () => {
    console.log(conditions);
    console.log(schedule);
    console.log(processList);
  };
  const handleReset = () => {
    setColumns([]);
  };

  function create_matrix() {
    const newmatrix: number[][] = [];
    const last_index_list = schedule
      .map((element) => {
        return Math.floor(element);
      })
      .filter((value, index, self) => {
        return value >= 0 && self.indexOf(value) === index;
      })
      .sort((a, b) => a - b)
      .map((element) => {
        return schedule
          .map((element) => {
            return Math.floor(element);
          })
          .lastIndexOf(element);
      });

    let last_element = 0;
    // ChartBoxEnum.Switch = switching ,0 = hidden, 1 = waiting, 2 = processing,
    for (let column = 0; column < schedule.length; column++) {
      newmatrix[column] = [];
      for (let row = 0; row < processList.length; row++) {
        if (
          !Number.isInteger(schedule[column]) &&
          Math.floor(schedule[column]) == row + 1
        ) {
          newmatrix[column][row] = ChartBoxEnum.OverHead;
          last_element = schedule[column];
        } else if (schedule[column] == row + 1) {
          newmatrix[column][row] = ChartBoxEnum.Processing;
          last_element = schedule[column];
        } else if (
          schedule[column] == ChartBoxEnum.Switch &&
          row == Math.floor(last_element) - 1
        ) {
          newmatrix[column][row] = ChartBoxEnum.Switch;
        } else if (
          column >= processList[row].arrivalTime &&
          column <= last_index_list[row]
        ) {
          newmatrix[column][row] = ChartBoxEnum.Wait;
        } else {
          newmatrix[column][row] = ChartBoxEnum.Empty;
        }
      }
    }
    setMatrix(newmatrix);
  }

  function renderColumn() {
    const newColumns: JSX.Element[] = [];
    const hiddenBox = <ChartBox boxType="hidden-box" />;
    const overheadBox = <ChartBox boxType="overhead-box" />;
    const switchBox = <ChartBox boxType="switch-box" />;
    const waitBox = <ChartBox boxType="wait-box" />;
    const processingBox = <ChartBox boxType="processing-box" />;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const renderAsync = async () => {
      for (let current_time = 0; current_time < matrix.length; current_time++) {
        const column = matrix[current_time].reduce(
          (accumulator: JSX.Element, proc, _process_index) => {
            switch (proc) {
              case ChartBoxEnum.OverHead:
                return (
                  <>
                    {accumulator}
                    {overheadBox}
                  </>
                );
              case ChartBoxEnum.Switch:
                return (
                  <>
                    {accumulator}
                    {switchBox}
                  </>
                );
              case ChartBoxEnum.Empty:
                return (
                  <>
                    {accumulator}
                    {hiddenBox}
                  </>
                );
              case ChartBoxEnum.Wait:
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

  function calculateTurnaround() {
    setTurnaround(
      processList.reduce((accumulator: number, process) => {
        console.log(
          schedule.lastIndexOf(process.id) + 1,
          "-",
          process.arrivalTime
        );
        return (accumulator +=
          schedule.map((value) => Math.floor(value)).lastIndexOf(process.id) +
          1 -
          process.arrivalTime);
      }, 0) / processList.length
    );
  }

  useEffect(() => {
    console.log(schedule);
    if (schedule.length > 0) {
      calculateTurnaround();
      create_matrix();
    }
  }, [schedule]);

  useEffect(() => {
    renderColumn();
  }, [play]);
  return (
    <div className="box chart">
      <button onClick={handleReset}>Reset</button> <br />
      <button onClick={handleClick}>Logs</button>
      <p>turnaround: {turnaround}</p>
      <br />
      <div className="chart__wrapper">{columns}</div>
    </div>
  );
};

export default FrontGanttChart;
