import { useState, useEffect, useRef } from "react";
import "./MainMemory.css";
import PaginationData from "../../../interfaces/PaginationData";

interface MainMemoryProps {
  pagingData: PaginationData[];
  intervalo: number;
  play: boolean;
  reset: boolean;
}

const MainMemory: React.FC<MainMemoryProps> = ({
  pagingData,
  intervalo,
  play,
  reset,
}) => {
  const [matrix, setMatrix] = useState<
    ({ value: number | string; address: number } | string | number)[][]
  >(Array.from({ length: 5 }, () => Array(10).fill("-")));
  const [currentStep, setCurrentStep] = useState(1);

  const isResetting = useRef(false);

  useEffect(() => {
    if (reset && !isResetting.current) {
      isResetting.current = true;

      const newMatrix = Array.from({ length: 5 }, () => Array(10).fill("-"));
      setMatrix(newMatrix);
      setCurrentStep(1);

      setTimeout(() => {
        isResetting.current = false;
      }, 1000);
    }
  }, [reset]);

  useEffect(() => {
    if (!isResetting.current) {
      const interval = setInterval(() => {
        if (currentStep < pagingData.length) {
          const currentRam = pagingData[currentStep].ram;
          const newMatrix = matrix.map((row) => [...row]);

          for (let i = 0; i < currentRam.length; i++) {
            const value = currentRam[i];
            const rowIndex = Math.floor(i / 10);
            const colIndex = i % 10;
            const address = rowIndex * 10 + colIndex;
            newMatrix[rowIndex][colIndex] = { value, address };
          }

          for (let i = currentRam.length; i < 50; i++) {
            const rowIndex = Math.floor(i / 10);
            const colIndex = i % 10;
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
  }, [currentStep, matrix, play, isResetting]);

  return (
    <div className="matrix-container">
      <h1>RAM</h1>
      {matrix.map((row: (number | string | { value: number | string; address: number })[], rowIndex: number) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((cell: number | string | { value: number | string; address: number }, cellIndex: number) => (
            <div key={cellIndex} className="matrix-cell">
              {typeof cell === "object" ? (
                <div>
                  <div className="cell-address">{cell.address}</div>
                  <div className="cell-value">{cell.value}</div>
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

export default MainMemory;
