import React, { useEffect, useState } from 'react';
import "./Matrix.css";

type MatrixProps = {
  n: number;
  m: number;
  interval: number;
};

const Matrix: React.FC<MatrixProps> = ({ n, m, interval }) => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const generateMatrix = (): number[][] => {
    const newMatrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j < m; j++) {
        row.push(Math.floor(Math.random() * 10));
      }
      newMatrix.push(row);
    }
    return newMatrix;
  };

  const handleRender = () => {
    setIsRendering(!isRendering);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRendering && matrix.length > 0) {
        setCurrentColumn((prevColumn) => (prevColumn + 1) % m);

        setMatrix((prevMatrix) => {
          const updatedMatrix = prevMatrix.map((row) => [...row]);

          for (let i = 0; i < n; i++) {
            updatedMatrix[i][currentColumn] = Math.floor(Math.random() * 10);
          }

          return updatedMatrix;
        });
      }
    }, interval * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRendering]);

  useEffect(() => {
    setMatrix(generateMatrix());
  }, [n, m]);

  const handleReset = () => {
    setMatrix([]);
    setIsRendering(false);
  };

  return (
    <div>
      <div className="grid-container">
        {matrix.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((value, columnIndex) => (
              <div className="grid-item" key={columnIndex}>
                {value}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <button onClick={handleRender}>{isRendering ? 'Stop Rendering' : 'Start Rendering'}</button>
      <button onClick={handleReset}>Reset Matrix</button>
    </div>
  );
};

export default Matrix;
