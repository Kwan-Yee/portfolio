import React from "react";

function CalenderHeader({ day }) {
  return (
    <div
      className="calender-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        textTransform: "uppercase",
        fontFamily: "Calibri, sans-serif",
        fontSize: "20px",
        padding: "2px",
        color: "#ffffff",
      }}
    >
      {day}
    </div>
  );
}

export default CalenderHeader;
