import { useDraggable } from "@dnd-kit/core";
import { useHover } from "@uidotdev/usehooks";
import { CSS } from "@dnd-kit/utilities";
import React, { useRef, useEffect } from "react";

function CalendarEventCell({ event }) {
  const [ref, hovering] = useHover();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: "drag-" + event.id,
      data: { eventDragged: event },
    });

  // restrict the default scaling behaviour to remain teh same as original
  const customTransform = { ...transform, scaleX: 1, scaleY: 1 };

  const eventCellRef = useRef(null);

  useEffect(() => {
    if (eventCellRef.current) {
      ref(eventCellRef.current);
      setNodeRef(eventCellRef.current);
    }
  }, []);

  return (
    <div
      key={event.id}
      ref={eventCellRef}
      {...listeners}
      {...attributes}
      className="calendar-event-cell"
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "76%",
        minHeight: "18px",
        textTransform: "capitalize",
        backgroundColor: hovering ? "#7acc90" : "#95dba8",
        margin: "1px 0px",
        padding: "1px 8px",
        borderRadius: "5px",
        zIndex: 999,
        cursor: "grab",
        transform: CSS.Transform.toString(customTransform),
        transition,
        height: "18px",
      }}
      //   onClick={() => alert(event.title)}
    >
      {event.title}
    </div>
  );
}

export default CalendarEventCell;
