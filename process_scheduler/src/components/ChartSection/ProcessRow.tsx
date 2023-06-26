import ChartBox from "./ChartBox";

const ProcessRow: any = (props: any) => {
  return (
    <div className="row align-items-center">
      {props.processName}:
      <ChartBox boxType="hidden-box" />
      <ChartBox boxType="wait-box" />
      <ChartBox boxType="wait-box" />
      <ChartBox boxType="wait-box" />
      <ChartBox boxType="switch-box" />
      <ChartBox boxType="processing-box" />
      <ChartBox boxType="processing-box" />
      <ChartBox boxType="processing-box" />
      <ChartBox boxType="switch-box" />
      <ChartBox boxType="hidden-box" />
      <ChartBox boxType="wait-box" />
      <ChartBox boxType="wait-box" />
    </div>
  );
};

export default ProcessRow;
