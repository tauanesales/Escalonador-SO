import ChartBox from "./ChartBox";

const ProcessRow: React.FC<any> = (props) => {
  function handleClick() {
    console.log(props.process.arrivalTime);
  }
  
  function renderRow() {
    const schedule = props.schedule;
    const arrivalTime = props.process.arrivalTime;
    const pross_index = props.index;
    const end_time = schedule.lastIndexOf(pross_index);
    let last_time_active = 0;

    return schedule.map((active_process: number, index: number) => {
      if (index < arrivalTime || index > end_time) {
        return <ChartBox key={index} boxType="hidden-box" />;
      } else if (active_process === pross_index) {
        last_time_active = index;
        return <ChartBox key={index} boxType="processing-box" />;
      } else if (active_process === -1 && last_time_active + 1 === index) {
        return <ChartBox key={index} boxType="switch-box" />;
      } else {
        return <ChartBox key={index} boxType="wait-box" />;
      }
    });
  }

  return (
    <div className="row align-items-center">
      {props.processName}:
      {renderRow()} {/* Invoke the renderRow function */}
      <button onClick={handleClick}>macaco</button>

    </div>
  );
};

export default ProcessRow;
