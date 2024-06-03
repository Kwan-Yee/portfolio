import React, { createContext, useMemo, useState } from "react";
import { startOfMonth, getUnixTime } from "date-fns";

import MonthCalender from "./views/month";
import SelectedDaySidebar from "./views/day";
import { ScheduleProvider } from "./context-provider";

/**
 *
 * @returns A page that shows the schedule of events
 */
function Schedule() {
  /***
   TODO: Dnd, hover
   ***/

  return (
    <ScheduleProvider>
      <div
        className="schedule"
        style={{ display: "flex", width: "100%", height: "87vh" }}
      >
        <MonthCalender />
        <SelectedDaySidebar />
      </div>
    </ScheduleProvider>
  );
}

export default Schedule;
