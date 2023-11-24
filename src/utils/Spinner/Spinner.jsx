import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div
      className="center-spinner"
      data-testid="spinner-element"
      role="progressbar"
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
