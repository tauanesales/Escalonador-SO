import React, { useState } from "react";
// import ProcessRow from "./ProcessRow";
import "./FrontGanttChart.css";
import Process from "../../interfaces/Process";
import ChartBox from "./ChartBox";
import "./ChartBox.css";
import { useEffect } from "react";
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
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [columns, setColumns] = useState<JSX.Element[]>([]);
  const [sliderValue, setSliderValue] = useState(500);


//const schedule = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
//const schedule = [1, 1, 1, 1, 1, 3, 3, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 5];
//const schedule = [1, 1, -1, 2, 2, -1, 1, 1, -1, 3, 3, 4, 4, -1, 2, 5, 5, -1, 1, 4, 4, 5, 5];
  const schedule = [1, 1, -1, 2, 2, -1, 3, 3, 5, 5, -1, 5, 5, 4, 4, -1, 4, 4, 2, 1, 1, -1, 1];

  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 5, deadline: 20, numPages: 2 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline: 17, numPages: 2 },
    { id: 3, arrivalTime: 4, executionTime: 2, deadline: 8, numPages: 2 },
    { id: 4, arrivalTime: 6, executionTime: 4, deadline: 10, numPages: 2 },
    { id: 5, arrivalTime: 8, executionTime: 4, deadline: 5, numPages: 2 },
  ];
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(processData);
  };

  const handleStart = () => {
    renderColumn();
  }
  function create_matrix(){
    const newmatrix: number[][] = [];
    const last_index_list =schedule.map( (currentElement, index) => {
        return schedule.lastIndexOf(index+1);
      })
    let last_element = 0;
    // -1 = switching ,0 = hidden, 1 = waiting, 2 = processing, 
    for( let i = 0; i < schedule.length; i++){
      newmatrix[i] = [];
      for( let j = 0; j < processes.length; j++){
        if (schedule[i] == j+1){
          newmatrix[i][j] = 2;
          last_element = schedule[i];
        }else if( schedule[i] == -1 && j == last_element-1){
          newmatrix[i][j] = -1;
        }else if( i >= processes[j].arrivalTime && i <= last_index_list[j] ){
          newmatrix[i][j] = 1;
        }else{
          newmatrix[i][j] = 0;
        }
        
      }
    }
    setMatrix(newmatrix);
    console.log(newmatrix);
    }

  useEffect(() => {
      create_matrix();
    }, []);


  function handleReset(){
    setColumns([])
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

        const column = matrix[current_time].reduce((accumulator: JSX.Element, proc, process_index) => {
          switch (proc) {
            case -1:
              return <>{accumulator}{switchBox}</>;
            case 0:
              return <>{accumulator}{hiddenBox}</>;
            case 1:
              return <>{accumulator}{waitBox}</>;
            default:
              return <>{accumulator}{processingBox}</>;
          }
        }, <></>);
  
        newColumns.push(<>{column}<br /></>);
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
      <input type="range" min="125" max="2000" step="125" value={sliderValue} onChange={handleSliderChange}/>
      <p>Slider Value: {sliderValue/1000}</p>

      <br/>
      {columns}
    </div>
  );
};

export default FrontGanttChart;