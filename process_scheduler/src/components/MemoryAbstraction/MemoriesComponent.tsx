import React from "react";
import MainMemory from "./RAM/MainMemory";
import DiskMemory from "./Disk/Disk";
import "./MemoriesStyle.css";

function MomoriesComponent() {
  return (
    <div className="memory-container">
      <div className="disk-container">
        <DiskMemory />
      </div>
      <div className="ram-container">
        <MainMemory />
      </div>
    </div>
  );
}

export default MomoriesComponent;
