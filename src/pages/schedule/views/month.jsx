import React, { useCallback, useMemo, useState } from "react";
import { getUnixTime, format, addDays } from "date-fns";
import styled from "styled-components";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import { useCalendarSettings } from "../hooks/useCalendarSettings";
import {
  getWeeksForMonthView,
  getDaysForMonthViews,
} from "../utils/getters-month-view";
import CalenderHeader from "../components/calendar-header";
import CalendarCell from "../components/calendar-cell";
import { useScheduleContext } from "../context-provider";
import CalendarEventCell from "../components/calendar-event-cell";

//Styled components

/**
 * Container for the entire calendar layout.
 * Uses flexbox to arrange children in a column.
 */
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  flex: 9;
`;

/**
 * Header section of the calendar, containing the week days.
 * Uses flexbox to arrange children in a row.
 */
const CalendarHeaders = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 24px;
  margin: 3px 0px;
  background-color: #2d2e33;
  border-radius: 11px;
`;

/**
 * Main content area of the calendar where weeks are displayed.
 * Has a fixed height of 82vh.
 */
const CalendarContent = styled.div`
  height: 82vh;
  max-height: 82vh;
  box-sizing: border-box;
`;

/**
 * Row for a single week in the calendar.
 * Uses flexbox to arrange children in a row.
 * Fixed height at each week
 */
const WeekRow = styled.div`
  display: flex;
  height: ${100 / 6}%;
  max-height: ${100 / 6}%;
  margin: 4px 0px;
  box-sizing: border-box;
`;

export const events = [
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(new Date(), "PPPP"),
    time: "10:00",
    id: 1,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(addDays(new Date(), 1), "PPPP"),
    time: "10:00",
    id: 2,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(addDays(new Date(), 2), "PPPP"),
    time: "10:00",
    id: 3,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(addDays(new Date(), 3), "PPPP"),
    time: "10:00",
    id: 4,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(new Date(), "PPPP"),
    time: "10:00",
    id: 5,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
  {
    title: "Meeting 1 asdfasdfasdfasdf",
    date: format(new Date(), "PPPP"),
    time: "10:00",
    id: 6,
    category: "Meeting",
    description: "Meeting 1",
    location: "Room 1",
    createdBy: "Kwan Yee",
    attendees: ["Kwan Yee"],
    createdAt: getUnixTime(new Date()),
  },
];

/**
 *
 * @returns A monthly view of the month of interest.
 * The month of interest defaults to the current month with
 * today's date being highlight
 */
function MonthCalender() {
  //TODO: calendar settings to be undefined for now potential use case for changing how the headers are arranged
  const { calendarSettings: moreCalendarSettings } = useCalendarSettings();
  const startsAt = moreCalendarSettings.startsAt ?? 0;

  const { scheduleData, updateScheduleData } = useScheduleContext();

  const weeks = useMemo(() => {
    return getDaysForMonthViews(scheduleData.visibleDates * 1000, startsAt);
  }, [startsAt, scheduleData.visibleDates]);

  const weekHeader = useMemo(() => {
    return getWeeksForMonthView(startsAt);
  }, [startsAt]);

  //dnd related states and handlers
  const [overlayEvent, setOverlayEvent] = useState(null);
  const handleDragStart = useCallback(
    ({ active }) => {
      // console.log(active);
      setOverlayEvent(active.data.current.eventDragged);
    },
    [events]
  );

  const handleDragOver = useCallback(({ active, over }) => {
    // console.log("active: ", active);
    // console.log("over: ", over);
  }, []);

  const handleDragCancel = useCallback(() => {
    setOverlayEvent(null);
  }, []);

  const handleDragEnd = useCallback(({ active, over }) => {
    setOverlayEvent(null);
    console.log("active: ", active);
    console.log("over: ", over);

    //change it into the date dropped
    const dateDropped = over.data.current;
    console.log("date dropped: ", dateDropped);

    const eventToUpdate = events.find(
      (event) => event.id === parseInt(active.id.split("-")[1])
    );

    eventToUpdate ? (eventToUpdate.date = format(dateDropped, "PPPP")) : null;
    console.log("event to update: ", eventToUpdate);
    console.log(events);

    // console.log(new Date(dateDropped));

    //update selected day
    updateScheduleData({ ...scheduleData, selectedDay: dateDropped });

    //send server request to update the event db
  }, []);

  // useEffect(() => {
  //   //DEV: Emulate data fetching from server
  //   setTimeout(() => {

  //   }, 1000);
  // }, []);

  return (
    <CalendarContainer className="calendar-container">
      <CalendarHeaders className="calendar-headers">
        {weekHeader.map((day) => (
          <CalenderHeader key={day} day={day} />
        ))}
      </CalendarHeaders>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay>
          {overlayEvent ? (
            <CalendarEventCell event={overlayEvent} isDragging={true} />
          ) : null}
        </DragOverlay>
        <CalendarContent className="calendar-content">
          {weeks.map((day) => (
            <WeekRow key={day[startsAt].getTime()}>
              {Object.entries(day).map(([key, date]) => (
                <CalendarCell
                  key={date}
                  date={date}
                  visibleDates={scheduleData.visibleDates}
                  events={events.filter((event) => {
                    return event.date === format(date, "PPPP");
                  })}
                  style={{ flexShrink: 0 }}
                />
              ))}
            </WeekRow>
          ))}
        </CalendarContent>
      </DndContext>
    </CalendarContainer>
  );
}

export default MonthCalender;
