import { useHover } from "@uidotdev/usehooks";
import React from "react";

function CalendarEventCell({ event }) {
  const [eventCellRef, hovering] = useHover();
  return (
    <div
      key={event.id}
      ref={eventCellRef}
      className="calendar-event"
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: "110px",
        minHeight: "18px",
        textTransform: "capitalize",
        backgroundColor: hovering ? "#7acc90" : "#95dba8",
        margin: "1px 0px",
        padding: "1px 6px",
        borderRadius: "5px",
        zIndex: 999,
        cursor: "grab",
      }}
      //   onClick={() => alert(event.title)}
    >
      {event.title}
    </div>
  );
}

export default CalendarEventCell;
