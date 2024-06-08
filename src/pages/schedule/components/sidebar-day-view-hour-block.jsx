import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import IntervalCell from "./sidebar-day-view-hour-block-cell";
import { useScheduleContext } from "../context-provider";
import IndividualEventContainer from "./sidebar-day-view-event-cell-container";

// Styled Components
const DayHourBlock = styled.div`
  min-height: 96px;
  height: 96px;
  display: flex;
  flex-direction: row;
`;

const HourTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex: 3;
  max-width: 70px;
`;

const HoursContainer = styled.div`
  flex: 9;
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HourLine = styled.hr`
  margin: 8px 0 1px 0;
  border: none;
  height: 1px;
  background-color: #2d2e33;
  opacity: 40%;
`;

const HourBlockIntervalContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

/**
 *
 * @param hour - the hour that this block is rendering for
 * @param intervals - the intervals (fixed at 15mins per hour) that this block is rendering for
 * @returns A single hour block that contains 2 siblings components the display of the hour and the cells for intervals within each hour
 */
function HourBlock({ hour, intervals }) {
  // console.log("intervals: ", intervals);

  const { scheduleData, updateScheduleData } = useScheduleContext();
  const events = scheduleData.events;

  // console.log("events: ", events);
  const eventsForThisTime = events.filter(
    (event) =>
      format(event.date, "P") === format(scheduleData.selectedDay, "P") &&
      event.startTime.split(":")[0] === hour.split(":")[0]
  );
  // console.log("eventsForThisTime: ", eventsForThisTime);

  return (
    <DayHourBlock className="day-hour-block">
      <HourTime className="hour-time">{hour}</HourTime>
      <HoursContainer className="hours-container">
        <HourLine className="hour-line" />
        <HourBlockIntervalContainer
          className="hour-block-interval-container"
          style={{ zIndex: eventsForThisTime.length > 0 ? 99 : 10 }}
        >
          {intervals.map((interval) => (
            <IntervalCell key={interval} interval={interval} />
            // {events.filter((event) => (event.startTime === interval && format(event.date, "P") === format(scheduleData.selectedDay, "P"))? event : null).map((event) => ())}
          ))}
          <div
            className="events-container"
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              padding: "0px 6px",
              height: "100%",
              width: "87%",
              pointerEvents: "none",
            }}
          >
            {eventsForThisTime.length > 0 &&
              eventsForThisTime.map((event) => (
                <IndividualEventContainer key={event.id} event={event} />
              ))}
          </div>
        </HourBlockIntervalContainer>
      </HoursContainer>
    </DayHourBlock>
  );
}

export default HourBlock;
