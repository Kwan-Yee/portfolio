import React, { useContext, createContext, useState } from "react";
import { getUnixTime, startOfMonth } from "date-fns";
import { events } from "../../mock-data-provider/schedule-events";

const today = new Date();
const calendarData = {
  visibleDates: getUnixTime(startOfMonth(today)),
  selectedDay: today,
  currentDay: today,
  events: events,
};
const ScheduleContext = createContext(calendarData);

/**
 *
 * @param {children} - nested components that needs access to the parent
 * @returns A provider component that gives access to the context
 */
export function ScheduleProvider({ children }) {
  const [scheduleData, setScheduleData] = useState(calendarData);

  const updateScheduleData = (newData) => {
    setScheduleData((prev) => {
      let newContext = prev;
      newContext = newData;
      return newContext;
    });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [dayViewExpanded, setDayViewExpanded] = useState(false);

  const [modalEditMode, setModalEditMode] = useState(false);

  return (
    <ScheduleContext.Provider
      value={{
        scheduleData,
        updateScheduleData,
        modalOpen,
        setModalOpen,
        selectedEvent,
        setSelectedEvent,
        dayViewExpanded,
        setDayViewExpanded,
        modalEditMode,
        setModalEditMode,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

/**
 *
 * @returns A custom SCHEDULE hook that provides access to the {context, mutator methods}
 */
export const useScheduleContext = () => useContext(ScheduleContext);
