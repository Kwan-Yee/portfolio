import React from "react";
import { useHover } from "@uidotdev/usehooks";

function IntervalCell() {
  const [intervalRef, hovering] = useHover();

  return (
    <div
      ref={intervalRef}
      className="hour-block-interval"
      style={{
        content: "''",
        backgroundColor: hovering ? "#c5c6c7" : "#dcddde",
        margin: "1px",
        borderRadius: "4px",
        flex: 1,
      }}
    ></div>
  );
}

export default IntervalCell;
