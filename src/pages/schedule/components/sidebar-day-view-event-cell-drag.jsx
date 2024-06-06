import React, { useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useHover } from "@uidotdev/usehooks";
import {
  differenceInMinutes,
  parse,
  addHours,
  isBefore,
  isEqual,
  setMinutes,
} from "date-fns";

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

  const countHourLines = (start, end) => {
    const timeFormat = "HH:mm";
    const startTime = parse(start, timeFormat, new Date());
    const endTime = parse(end, timeFormat, new Date());

    let count = 0;
    let current = startTime;

    // Move to the next hour line
    current = addHours(current, 1);
    current.setMinutes(0, 0, 0); // Reset to the exact hour

    while (isBefore(current, endTime) || isEqual(current, endTime)) {
      count++;
      current = addHours(current, 1);
    }

    return count;
  };

  const customHeight = (event) => {
    if (!event) return;

    const timeFormat = "HH:mm";
    const startTime = parse(event.endTime, timeFormat, new Date());
    const endTime = parse(event.startTime, timeFormat, new Date());

    const duration = differenceInMinutes(startTime, endTime);

    const heightModifier = duration / 15;
    const hourLinesCrossed = countHourLines(event.startTime, event.endTime);
    const pixelModifier = heightModifier - 1 + hourLinesCrossed * 8;

    return { heightModifier, pixelModifier };
  };

  const { heightModifier, pixelModifier } = customHeight(event);

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
        minWidth: "20%",
        flex: 1,
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0px 1px 0px 0px",
        borderRadius: "4px",
        cursor: "grab",
        height: `calc((25% * ${heightModifier}) + (${pixelModifier} * 1px))`,
        pointerEvents: "auto",
      }}
      // onClick={() => console.log("clicked " + event.title)}
    >
      <SidebarEventCell event={event} isDragging={isDragging} />
    </div>
  );
}

export default DraggableDayEventCell;
