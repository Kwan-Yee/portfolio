import React from "react";

function SidebarEventCell({ event }) {
  return (
    <div style={{ padding: "2px", overflow: "hidden" }}>
      <h4 style={{ margin: "0px", fontWeight: "normal" }}>
        [{event.startTime} - {event.endTime}]: {event.title}
      </h4>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#5b5b5b",
          opacity: "40%",
          width: "97%",
          margin: "1px",
        }}
      />
      <p style={{ fontSize: "14px", margin: "0px" }}>{event.description}</p>
    </div>
  );
}

export default SidebarEventCell;
