import React, { useEffect, useState } from "react";
import "./FrontGanttChart.css";
import { IProcess } from "../../interfaces/Process";
import ChartBox from "./ChartBox";
import { IConditions } from "../../interfaces/Conditions";

interface FrontGanttChartProps {
  processList: IProcess[];
  conditions: IConditions;
}

const INITIAL_MATRIX = 10;

const FrontGanttChart: React.FC<FrontGanttChartProps> = ({ processList, conditions }) => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const [sliderValue, setSliderValue] = useState(500);

  // console.log(processList);

  // processList = [
  //   { id: "1", arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 2 },
  //   { id: "2", arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
  //   { id: "3", arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 2 },
  //   { id: "4", arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 2 },
  //   { id: "5", arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  // ];

  const schedule = [
    1, 1, -1, 2, 2, -1, 3, 3, 5, 5, -1, 5, 5, 4, 4, -1, 4, 4, 2, 1, 1, -1, 1,
  ];

  const [isPlaying, setIsPlaying] = useState(false);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleStart = () => {
    if (!processList.length) return;
    renderColumn();
  };
  function create_matrix() {
    const newmatrix: number[][] = [];
    const last_index_list = schedule.map((currentElement, index) => {
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

  useEffect(() => {
    create_matrix();
  }, []);

  function handleReset() {
    setColumns([]);
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
          (accumulator: JSX.Element, proc, process_index) => {
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

        await delay(sliderValue);
      }
      setIsPlaying(false);
    };

    renderAsync();
  }

  return (
    <div className="box chart">
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleReset}> reset</button>
      <input
        type="range"
        min="125"
        max="2000"
        step="125"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p>Slider Value: {sliderValue / 1000}</p>

      <br />
      <div className="chart__wrapper">{columns}</div>
    </div>
  );
};

export default FrontGanttChart;
