import React, { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import CalendarEventCell from "./calendar-event-cell";
import { useHover } from "@uidotdev/usehooks";
import { useScheduleContext } from "../context-provider";

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
    return "#b9edc7";
  };
  // restrict the default scaling behaviour to remain teh same as original
  const customTransform = { ...transform, scaleX: 1, scaleY: 1 };

  const eventCellRef = useRef(null);

  const { setModalOpen, selectedEvent, setSelectedEvent } =
    useScheduleContext();

  const handleEventCellClick = (eventOfThisCell) => {
    // console.log("clicked");
    setSelectedEvent(eventOfThisCell);
    setModalOpen(true);
  };

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
        zIndex: 99,
        cursor: "grab",
        height: "18px",
        width: "94%",
        margin: "1px 0px",
        border: isDragging ? "1px dashed #7acc90" : null,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleEventCellClick(event);
      }}
    >
      {!isDragging && (
        <CalendarEventCell event={event} isDragging={isDragging} />
      )}
    </div>
  );
}

export default DraggableEventCell;
