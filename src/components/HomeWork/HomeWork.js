import "./homework.css";

import Welcome from "../welcome/Welcome";
import Counter from "../counter/Counter";
import Pokemon from "../pokemon/Pokemon";

import { useState, useEffect } from "react";

const HomeWork = () => {
  const [controlView, setControlView] = useState(1);
  const [value, setValue] = useState(1);

  const arrTitle = ["", "Welcome page", "Counter page", "Pokemon page"];

  useEffect(() => {
    // Update the document title using the browser API
    document.title = arrTitle[controlView];
  }, [controlView]);

  const handleAdd = () => {
    setValue(value + 1);
  };

  const handleMinus = () => {
    setValue(value - 1);
  };

  return (
    <div className="mainContent">
      <div className="control">
        <button
          className="control-btn"
          onClick={() => {
            setControlView(1);
          }}
        >
          Show welcome example
        </button>
        <button
          className="control-btn"
          onClick={() => {
            setControlView(2);
          }}
        >
          Show counter example
        </button>
        <button
          className="control-btn"
          onClick={() => {
            setControlView(3);
          }}
        >
          Show pokemon example
        </button>
      </div>
      {controlView === 1 ? (
        <Welcome name="Son Tung" age="25" />
      ) : controlView === 2 ? (
        <div>
          <Counter
            value={value}
            handleAdd={handleAdd}
            handleMinus={handleMinus}
          />
          <div className="showValue">
            <h1>Current value {value}</h1>
          </div>
        </div>
      ) : (
        <Pokemon />
      )}
    </div>
  );
};
export default HomeWork;
