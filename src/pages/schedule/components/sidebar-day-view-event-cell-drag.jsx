import React, { useRef, useEffect } from "react";
import { useHover } from "@uidotdev/usehooks";
import {
  differenceInMinutes,
  parse,
  addHours,
  isBefore,
  isEqual,
} from "date-fns";

import SidebarEventCell from "./sidebar-day-view-event-cell";
import { useScheduleContext } from "../context-provider";

function DayEventCell({ event }) {
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

  const { scheduleData, setModalOpen, setSelectedEvent } = useScheduleContext();

  return (
    <div
      ref={hoverRef}
      className="day-event-container"
      style={{
        backgroundColor: isHovering ? "#7acc90" : "#b9edc7",
        minWidth: "20%",
        flex: 1,
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0px 1px 0px 0px",
        borderRadius: "4px",
        height: `calc((25% * ${heightModifier}) + (${pixelModifier} * 1px))`,
        pointerEvents: "auto",
        border: "2px solid #7acc90",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => {
        setSelectedEvent(event);
        setModalOpen(true);
      }}
    >
      <SidebarEventCell event={event} />
    </div>
  );
}

export default DayEventCell;
