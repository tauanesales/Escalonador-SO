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
  reset: boolean;
}

const FrontGanttChart: React.FC<FrontGanttChartProps> = ({
  conditions,
  processList,
  schedule,
  play,
  reset,
}) => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const [turnaround, setTurnaround] = useState<number>(0);

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
		  if(current_time == 0) {
			  document.getElementsByClassName("chart")[0].scrollIntoView({behavior: "smooth"});
		  };
		  if(current_time == matrix.length - 1) {
			  (document.getElementById("chart__turnaround") as HTMLElement).style.color = "black";
			  (document.getElementById("button__reset") as HTMLInputElement).disabled =
			  false;
		  }
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
		
		if(current_time == 0) {
			newColumns.push(
			<div key="count" className="chart__column__count">
			{[...Array(processList.length).keys()].map(x => ++x).reverse().toString().split(',').map((num) => <p key={"count_"+num}>{num}</p> )}
			</div>
        );
		  };

        newColumns.push(
          <div key={current_time} className="chart__column">
            <div key={current_time} className="chart__wrapper">
              {current_time}
            </div>
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
        // console.log(
        //   schedule.lastIndexOf(process.id) + 1,
        //   "-",
        //   process.arrivalTime
        // );
        return (accumulator +=
          schedule.map((value) => Math.floor(value)).lastIndexOf(process.id) +
          1 -
          process.arrivalTime);
      }, 0) / processList.length
    );
  }

  useEffect(() => {
    // console.log(schedule);
    if (schedule.length > 0) {
      calculateTurnaround();
      create_matrix();
    }
  }, [schedule]);

  useEffect(() => {
	let noExceptions = true;
	var fields = document.getElementsByClassName("process__card__fields");
	for(var i = 0; i < fields.length; i++) {
		if(i % 2 == 0) {
			if(Number((fields[i].querySelector("input[name='executionTime']") as HTMLInputElement).value) < 1) {
				noExceptions = false;
			}
		} else {
			if(Number((fields[i].querySelector("input[name='numPages']") as HTMLInputElement).value) < 1) {
				noExceptions = false;
			}
		}
	}
    if(noExceptions) {
		renderColumn();
	} else {
		(document.getElementById("chart__warning") as HTMLElement).style.display = 'inline';
		document.getElementsByClassName("chart")[0].scrollIntoView({behavior: "smooth"});
		(document.getElementById("button__reset") as HTMLInputElement).disabled =
			  false;
		(document.getElementsByClassName("memory-container")[0] as HTMLElement).style.visibility = 'hidden';
	}
  }, [play]);

  useEffect(() => {
    setColumns([]);
  }, [reset]);

  return (
    <div className="box chart">
	  <div id="chart__warning">
	    <h2>O tempo de execução e a quantidade de páginas de todos os processos devem possuir valor maior que zero!</h2>
	  </div>
      <p id="chart__turnaround">Turnaround: {turnaround}</p>
      <br />
      <div className="chart__wrapper">{columns}</div>
    </div>
  );
};

export default FrontGanttChart;
