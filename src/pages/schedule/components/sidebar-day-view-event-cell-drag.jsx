import React, { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useHover } from "@uidotdev/usehooks";

import SidebarEventCell from "./sidebar-day-view-event-cell";

function DraggableDayEventCell({ event }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id: "drag-day-",
    data: { eventDragged: event },
  });

  const customHeight = () => {};

  const [hoverRef, isHovering] = useHover();
  const dayEventRef = useRef(null);

  useEffect(() => {
    if (dayEventRef.current) {
      hoverRef(dayEventRef.current);
      setNodeRef(dayEventRef.current);
    }
  }, []);

  const backgroundColor = () => {
    // if (isDragging) return null;
    if (isHovering) return "#7acc90";
    return "#95dba8";
  };

  return (
    <div
      ref={dayEventRef}
      {...listeners}
      {...attributes}
      style={{
        backgroundColor: isHovering ? "#7acc90" : "#95dba8",
        zIndex: 99,
        minWidth: "20%",
        flex: 1,
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0px 1px 0px 0px",
        borderRadius: "4px",
        cursor: "grab",
        height: "19px",
        pointerEvents: "auto",
      }}
      // onClick={() => console.log("clicked " + event.title)}
    >
      <SidebarEventCell event={event} isDragging={isDragging} />
    </div>
  );
}

export default DraggableDayEventCell;
