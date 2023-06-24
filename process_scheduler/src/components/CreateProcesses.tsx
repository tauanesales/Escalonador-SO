import React, { useState } from "react";
import "./CreateProcesses.css";
import Process from "./Process";

const CreateProcesses: React.FC = () => {
  const [customElements, setCustomElements]: any = useState([]);

  const deleteProcess = (index: Number) => {
    // Logic to delete the custom element
    const updatedElements = customElements.filter(
      (_: any, i: any) => i !== index
    );
    setCustomElements(updatedElements);
  };

  const addProcess = () => {
    // Logic to add a new custom element
    const newElement: any = (
      <Process key={customElements.length} index={customElements.length + 1} />
    );
    setCustomElements([...customElements, newElement]);
  };

  return (
    <div>
      <button
        className="box align-items-center center button green"
        onClick={addProcess}
      >
        Criar Processo
      </button>
      <div id="process-box column" className="large-box row">
        {customElements.map((element: any, index: any) => (
          <div key={index}>
            <button
              className="close-btn small-text center align-items-center pm-0"
              onClick={() => deleteProcess(index)}
            >
              ✖
            </button>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProcesses;
