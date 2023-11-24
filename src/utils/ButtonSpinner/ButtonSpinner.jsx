import React from "react";

const ButtonSpinner = () => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <div
        className="spinner"
        style={{
          width: "1em",
          height: "1em",
          marginRight: "0.5em",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderTop: "2px solid #fff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <span>Adding...</span>
    </div>
  );
};

export default ButtonSpinner;
