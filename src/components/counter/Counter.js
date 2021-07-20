import "./Counter.css";
import React from "react";

const Counter = (props) => {
  const { value, handleMinus, handleAdd } = props;
  return (
    <>
      <div className="counter">
        <button onClick={handleMinus} className="counter-btn">
          -
        </button>
        <span className="counter-value">{value}</span>
        <button onClick={handleAdd} className="counter-btn">
          +
        </button>
      </div>
    </>
  );
};

export default Counter;
