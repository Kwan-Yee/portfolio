import React, { createContext, useMemo, useState } from "react";

import MonthCalender from "./views/month";
import SelectedDaySidebar from "./views/day";
import { useScheduleContext } from "./context-provider";
import EventModal from "./components/event-modal";

/**
 *
 * @returns A page that shows the schedule of events
 */
function Schedule() {
  const { modalOpen, setModalOpen } = useScheduleContext();

  return (
    <div
      className="schedule-page"
      style={{
        display: "flex",
        height: "87vh",
        position: "relative",
        margin: "10px",
      }}
    >
      <MonthCalender />
      <SelectedDaySidebar />
      <EventModal open={modalOpen} />
    </div>
  );
}

export default Schedule;
