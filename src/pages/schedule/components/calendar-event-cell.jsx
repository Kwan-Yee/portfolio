import { useDraggable } from "@dnd-kit/core";
import { useHover } from "@uidotdev/usehooks";
import { CSS } from "@dnd-kit/utilities";
import React, { useRef, useEffect } from "react";

/**
 *
 * @param {event} - event object
 * @returns Individual event cell to be rendered in the DraggableEventCell.
 */
function CalendarEventCell({ event, isDragging }) {
  return (
    <div
      key={event.id}
      className="calendar-event-cell"
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        backgroundColor: isDragging ? "#7acc90" : null,
        borderRadius: "5px",
        padding: "1px 8px",
        cursor: "grab",
      }}
    >
      [{event.startTime}]: {event.title}
    </div>
  );
}

export default CalendarEventCell;
