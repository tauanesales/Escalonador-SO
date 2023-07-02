import React from "react";
import { IConditions } from "../../interfaces/Conditions";
import "./InputsAndMethods.css";

interface InputsAndMethodsProps {
  conditions: IConditions;
  setConditions: React.Dispatch<React.SetStateAction<IConditions>>;
}

const methodOptions: IConditions["method"][] = ["edf", "fifo", "rr", "sjf"];
const paginationOptions: IConditions["pagination"][] = ["fifo", "lru"];

const InputsAndMethods = ({ conditions, setConditions }: InputsAndMethodsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setConditions({ ...conditions, [id]: value ? parseInt(value) : "" });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
              placeholder="0"
              value={conditions.quantum}
            />
          </label>
          <label htmlFor="overload" className="methods__bottom_field">
            <p>Sobrecarga: </p>
            <input onChange={handleChange} type="number" id="overload" placeholder="0" />
          </label>
        </div>

        <fieldset className="methods__pagination">
          <legend className="methods__pagination__title">Paginação: </legend>
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
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default InputsAndMethods;
