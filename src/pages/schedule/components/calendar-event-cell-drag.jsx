import React, { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import CalendarEventCell from "./calendar-event-cell";
import { useHover } from "@uidotdev/usehooks";

function DraggableEventCell({ event }) {
  const [ref, hovering] = useHover();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: "drag-" + event.id,
    data: { eventDragged: event },
  });

  const backgroundColor = () => {
    if (isDragging) return null;
    if (hovering) return "#7acc90";
    return "#95dba8";
  };
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
      ref={eventCellRef}
      {...listeners}
      {...attributes}
      style={{
        transition,
        transform: customTransform,
        backgroundColor: backgroundColor(),
        borderRadius: "5px",
        zIndex: 999,
        cursor: "grab",
        height: "18px",
        width: "76%",
        margin: "1px 0px",
        border: isDragging ? "1px dashed #7acc90" : null,
      }}
    >
      {!isDragging && (
        <CalendarEventCell event={event} isDragging={isDragging} />
      )}
    </div>
  );
}

export default DraggableEventCell;
