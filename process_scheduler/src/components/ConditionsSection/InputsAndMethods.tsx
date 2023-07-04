import React, { useState } from "react";
import { IConditions } from "../../interfaces/Conditions";
import "./InputsAndMethods.css";
import logo from "../../assets/img/logo.png";
import logoIC from "../../assets/img/logoICvert_azulUFBA.png";

interface InputsAndMethodsProps {
  conditions: IConditions;
  setConditions: React.Dispatch<React.SetStateAction<IConditions>>;
}

const methodOptions: IConditions["method"][] = ["EDF", "FIFO", "RR", "SJF"];
const paginationOptions: IConditions["pagination"][] = ["fifo", "lru"];

const InputsAndMethods = ({ conditions, setConditions }: InputsAndMethodsProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setConditions({ ...conditions, [id]: value ? parseInt(value) : "" });
  };

  useState

  return (
    <div className="methods__form__wrapper">
	<img src={logo} alt="Logo" className="logo" />
	<img src={logoIC} alt="LogoIC" className="logo" />
    <form className="methods__form" onSubmit={(e) => e.preventDefault()}>
      <div className="methods">
        <h2 className="methods__heading">Selecione o método:</h2>
        <menu className="methods__options">
          {methodOptions.map((method) => (
            <li key={method}>
              <button
                onClick={() => setConditions({ ...conditions, method })}
                aria-selected={conditions.method === method || undefined}
                className="methods__button"
              >
                {method}
              </button>
            </li>
          ))}
        </menu>
      </div>

      <div className="methods__bottom">
        <div className="methods__bottom_qo">
          <label htmlFor="quantum" className="methods__bottom_field">
            <p>Quantum: </p>
            <input
              onChange={handleChange}
              type="number"
              id="quantum"
              placeholder= "0"
              value={conditions.quantum}
            />
          </label>
          <label htmlFor="overload" className="methods__bottom_field">
            <p>Sobrecarga: </p>
            <input onChange={handleChange}
            type="number" 
            id="sobrecarga" 
            placeholder="0" 
            value={conditions.sobrecarga} />
          </label>
        </div>

        <div className="methods__pagination">
          <h2 className="methods__pagination__title">Paginação: </h2>
          <div className="methods__pagination__options">
            <menu>
              {paginationOptions.map((pagination) => (
                <li key={pagination}>
                  <button
                    onClick={() => setConditions({ ...conditions, pagination })}
                    className="methods__pagination__button"
                    aria-selected={conditions.pagination === pagination || undefined}
                  >
                    {pagination}
                  </button>
                </li>
              ))}
            </menu>
            <input
                id="intervalo"
                type="range"
                min="125"
                max="2000"
                step="125"
                value={conditions.intervalo}
                onChange={handleChange}
             />
             {conditions.intervalo/1000} segundos
          </div>
        </div>
      </div>
    </form>
>>>>>>> origin/animation
  );
};

export default InputsAndMethods;
