import React from "react";
import {
  format,
  fromUnixTime,
  getUnixTime,
  isSameMonth,
  isToday,
  startOfMonth,
} from "date-fns";
import { useHover } from "@uidotdev/usehooks";
import styled from "styled-components";

import { useScheduleContext } from "../context-provider";
import { useDroppable } from "@dnd-kit/core";
import DraggableEventCell from "./calendar-event-cell-drag";

// Create styled components
const CalendarEventContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 4px 0px;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
`;

/**
 *
 * @param {Object} events -
 * @param {string} date -
 * @param {string} visibleDates -
 * @returns Individual calender cell that contains the a day formatted date and a event container.
 */
function CalendarCell({ events, date, visibleDates }) {
  // console.log(date);
  const [cellRef, hovering] = useHover();
  const isMonthOfInterest = isSameMonth(date, fromUnixTime(visibleDates));
  const { scheduleData, updateScheduleData } = useScheduleContext();
  const isSelectedDay =
    format(scheduleData.selectedDay, "PPPP") === format(date, "PPPP");

  const handleCellClick = () => {
    console.log("selected:", scheduleData.selectedDay);
    // mutate selected day in context
    if (isMonthOfInterest) {
      //move the border to the newly selected day
      updateScheduleData({ ...scheduleData, selectedDay: date });
    } else {
      //update the visible dates
      const newVisibleDates = getUnixTime(startOfMonth(date));
      updateScheduleData({
        ...scheduleData,
        visibleDates: newVisibleDates,
        selectedDay: date,
      });
    }
  };

  const { setNodeRef, isOver } = useDroppable({
    id: "drop-" + format(date, "PPPP"),
    data: date,
  });

  return (
    <div
      className="cell-container"
      ref={cellRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        flex: 1,
        fontFamily: "Calibri, sans-serif",
        fontSize: "20px",
        backgroundColor: isMonthOfInterest ? "#cbe1f5" : "#c8d7de",
        opacity:
          (hovering && isMonthOfInterest) || isSelectedDay ? "100%" : "65%",
        padding: "4px",
        margin: "0px 2px",
        borderRadius: "8px",
        // transform: hovering && isMonthOfInterest ? "scale(1.03)" : "scale(1)",
        transition: "0.3s",
        boxSizing: "border-box",
        minWidth: 0,
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCellClick();
      }}
    >
      {(isSelectedDay || hovering) && isMonthOfInterest && (
        <div
          className="pseudo-border"
          style={{
            content: '""',
            position: "absolute",
            top: "-2px", // Position the border above the div
            left: "-2px", // Position the border to the left of the div
            right: "-2px", // Position the border to the right of the div
            bottom: "-2px", // Position the border below the div
            border: "2px solid #2d2e33",
            borderRadius: "10px",
            opacity: hovering && !isSelectedDay ? "40%" : "80%",
          }}
        ></div>
      )}
      <div
        className="cell-date"
        style={{
          width: "40px",
          textAlign: "center",
          backgroundColor: isToday(date) ? "#91bde3" : null,
          borderRadius: "10px",
          textTransform: "uppercase",
        }}
      >
        {format(date, "d")}
      </div>
      <CalendarEventContainer
        className="event-container"
        ref={setNodeRef}
        style={{
          border: isOver ? "2px dashed #91bde3" : `2px dashed #cbe1f5`,
          borderRadius: "6px",
        }}
      >
        {events.map((event) => (
          <DraggableEventCell key={event.id} event={event} />
        ))}
      </CalendarEventContainer>
    </div>
  );
}

export default CalendarCell;
