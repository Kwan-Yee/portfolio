import React from "react";
import { useHover } from "@uidotdev/usehooks";

function IntervalCell({ interval }) {
  /**
   * TODO: onClick open modal for new event which means that it will be in edit mode
   */
  const [intervalRef, hovering] = useHover();

  // console.log("events for this tims: ", eventsForThisTime);

  return (
    <div
      ref={intervalRef}
      className="hour-block-interval"
      style={{
        backgroundColor: hovering ? "#c5c6c7" : "#dcddde",
        margin: "1px",
        borderRadius: "4px",
        flex: 1,
        opacity: "70%",
        height: "20px",
        display: "flex",
        flexDirection: "row",
        paddingRight: "22px",
      }}
      // onClick={() => console.log("clicked " + interval)}
    ></div>
  );
}

export default IntervalCell;
