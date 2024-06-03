import { useHover } from "@uidotdev/usehooks";
import React from "react";
import IntervalCell from "./sidebar-day-view-hour-block-cell";

function HourBlock({ hour, intervals }) {

  return (
    <div
      className="day-hour-block"
      style={{
        minHeight: "96px",
        height: "96px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        className="hour-time"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flex: 3,
        }}
      >
        {hour}
      </div>
      <div
        className="hours-container"
        style={{
          flex: 9,
          paddingRight: "6px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <hr
          style={{
            margin: "8px 0 1px 0",
            border: "none",
            height: "1px",
            backgroundColor: "#2d2e33",
            opacity: "40%",
          }}
        />
        <div
          className="hour-block-interval-container"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {intervals.map((interval) => (
            <IntervalCell key={interval} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HourBlock;
