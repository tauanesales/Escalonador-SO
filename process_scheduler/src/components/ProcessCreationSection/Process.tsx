import React, { useState } from "react";
import "./Process.css";

const Process: any = (props: any) => {
  const [processName, setProcessName] = useState("Processo " + props.index);

  const [time, setTime] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [priority, setPriority] = useState(0);
  const [arrival, setArrival] = useState(0);

  const handleSetProcessName = (e: any) => {
    setProcessName(e.target.value);
  };
  const handleSetTime = (e: any) => {
    setTime(e.target.value);
  };
  const handleSetDeadline = (e: any) => {
    setDeadline(e.target.value);
  };
  const handleSetPriority = (e: any) => {
    setPriority(e.target.value);
  };
  const handleSetArrival = (e: any) => {
    setArrival(e.target.value);
  };

  return (
    <div className="box yellow between column">
      <input
        className="box"
        type="text"
        value={processName}
        onChange={handleSetProcessName}
      />
      <div className="row between align-items-center wrap">
        <div className="row flex-grow between p-5">
          <div>Tempo:</div>
          <input
            className="mw-50"
            type="text"
            value={time}
            onChange={handleSetTime}
          ></input>
        </div>
        <div className="row flex-grow between p-5">
          <div>Deadline:</div>
          <input
            className="mw-50"
            type="text"
            value={deadline}
            onChange={handleSetDeadline}
          />
        </div>
      </div>

      <div className="row between align-items-center wrap">
        <div className="row flex-grow between p-5">
          <div> Páginas:</div>
          <input
            className="mw-50"
            type="text"
            value={priority}
            onChange={handleSetPriority}
          />
        </div>
        <div className="row flex-grow between p-5">
          <div> Chegada:</div>
          <input
            className="mw-50"
            type="text"
            value={arrival}
            onChange={handleSetArrival}
          />
        </div>
      </div>
    </div>
  );
};

export default Process;
