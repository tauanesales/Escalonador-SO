import React from "react";
import "./Process.css";

const Process: any = (props:any) => {
  return (
    <div className="box yellow between column mh-100">
      <input className="box" type="text" value={"Processo "+ props.index} />
      <div className="row between align-items-center">
        Tempo:
        <input className="mw-50" type="text" value="" />
        Deadline:
        <input className="mw-50" type="text" value="" />
      </div>

      <div className="row between align-items-center">
        Prioridade:
        <input className="mw-50" type="text" value="" />
        Chegada:
        <input className="mw-50" type="text" value="" />
      </div>
    </div>
  );
};

export default Process;
