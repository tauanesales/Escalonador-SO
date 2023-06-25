import "./ChartBox.css";

const ChartBox: any = (props: any) => {
  return <div className={"chart-box " + props.boxType}></div>;
};

export default ChartBox;
