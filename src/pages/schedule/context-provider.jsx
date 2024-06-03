import React, { useContext, createContext, useState } from "react";
import { getUnixTime, startOfMonth } from "date-fns";

const today = new Date();
const calendarData = {
  visibleDates: getUnixTime(startOfMonth(today)),
  selectedDay: today,
  currentDay: today,
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
  return (
    <ScheduleContext.Provider value={{ scheduleData, updateScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  );
}

/**
 *
 * @returns A custom hook that provides access to the {context, mutator methods}
 */
export const useScheduleContext = () => useContext(ScheduleContext);
