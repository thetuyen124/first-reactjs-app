import "./Welcome.css";

import React from "react";
const Welcome = (props) => {
  let { age, name, className } = props;
  className += " welcome";
  return (
    <div className={className}>
      <h1>Welcome Component {name}</h1>
      <h3>Age {age}</h3>
    </div>
  );
};

export default Welcome;
