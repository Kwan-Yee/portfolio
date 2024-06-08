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
      className="schedule"
      style={{
        display: "flex",
        width: "100%",
        height: "87vh",
        position: "relative",
      }}
    >
      <MonthCalender />
      <SelectedDaySidebar />
      <EventModal open={modalOpen} />
    </div>
  );
}

export default Schedule;
