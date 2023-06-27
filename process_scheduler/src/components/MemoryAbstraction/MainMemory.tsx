import { useState, useEffect } from "react";
import "./MainMemory.css"; // Importar o arquivo CSS para estilização

function MainMemory() {
  const pagingData = [
    { step: 0, ram: [242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN, 242, 1, 1, 1, NaN] },
    { step: 1, ram: [2, 2, 1, 1, 3] },
    { step: 2, ram: [4, 5, 1, 1, 4] }
  ];

  const [matrix, setMatrix] = useState<({ value: number | string, address: number } | string | number)[][]>(
    Array.from({ length: 5 }, () => Array(10).fill("-"))
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < pagingData.length) {
        const currentRam = pagingData[currentStep].ram;
        const newMatrix = matrix.map((row) => [...row]); // Create a copy of the matrix

        for (let i = 0; i < currentRam.length; i++) {
          const value = currentRam[i] !== undefined ? currentRam[i] : "-";
          const rowIndex = Math.floor(i / 10);
          const colIndex = i % 10;
          const address = rowIndex * 10 + colIndex; // Cálculo do endereço
          newMatrix[rowIndex][colIndex] = { value, address };
        }

        // Preenche os elementos restantes com "-"
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStep, matrix]);

  return (
    <div className="matrix-container">
      <h1>RAM</h1>
      {matrix.map((row: (number | string | { value: number | string, address: number })[], rowIndex: number) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((cell: number | string | { value: number | string, address: number }, cellIndex: number) => (
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
}

export default MainMemory;
