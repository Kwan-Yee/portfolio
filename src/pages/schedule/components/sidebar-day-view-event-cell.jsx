import React from "react";

function SidebarEventCell({ event }) {
  return (
    <div style={{ padding: "2px", overflow: "hidden" }}>
      [{event.startTime} - {event.endTime}]: {event.title}
    </div>
  );
}

export default SidebarEventCell;
