import { useState, useEffect } from "react";
import "./Disk.css";
import PaginationData from "../../../interfaces/PaginationData";

interface DiskProps {
  pagingData: PaginationData[];
  intervalo: number;
  play: boolean;
  reset: boolean;
}

const DiskMemory: React.FC<DiskProps> = ({
  pagingData,
  intervalo,
  play,
  reset,
}) => {
  const [matrix, setMatrix] = useState<
    ({ value: number | string; address: number } | string | number)[][]
  >(Array.from({ length: 10 }, () => Array(12).fill("-")));
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (reset) {
	  const newMatrix = Array.from({ length: 10 }, () => Array(12).fill("-"));
      setMatrix(newMatrix);
      setCurrentStep(1);
    }
  }, [reset]);

  useEffect(() => {
    if (!reset) {
      const interval = setInterval(() => {
        if (currentStep < pagingData.length) {
          const currentDisco = pagingData[currentStep].disk;
          const newMatrix = matrix.map((row) => [...row]);

          for (let i = 0; i < currentDisco.length; i++) {
            const value = currentDisco[i];
            const colIndex = i % 12;
            const rowIndex = Math.floor(i / 12);
            const address = rowIndex * 12 + colIndex;
            newMatrix[rowIndex][colIndex] = { value, address };
            if(!isNaN(value)){
              
            }else{
              newMatrix[rowIndex][colIndex] = "-";
            }
            
          }

          for (let i = currentDisco.length; i < 120; i++) {
            const colIndex = i % 12;
            const rowIndex = Math.floor(i / 12);
            newMatrix[rowIndex][colIndex] = "-";
          }

          setMatrix(newMatrix);
          setCurrentStep((prevStep) => prevStep + 1);
        } else {
          clearInterval(interval);
        }
      }, intervalo);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentStep, matrix, play]);

  return (
    <div className="matrix-container-disk">
      <h1>Disco</h1>
      {matrix.map((row: (number | string | { value: number | string; address: number })[], rowIndex: number) => (
        <div key={rowIndex} className="matrix-row-disk">
          {row.map((cell: number | string | { value: number | string; address: number }, cellIndex: number) => (
            <div key={cellIndex} className="matrix-cell-disk">
              {typeof cell === "object" ? (
                <div>
                  <div className="cell-address-disk">{cell.address}</div>
                  <div className="cell-value-disk">{cell.value}</div>
                </div>
              ) : (
                cell
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DiskMemory;