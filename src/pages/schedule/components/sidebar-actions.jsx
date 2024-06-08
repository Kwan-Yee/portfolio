import React from "react";
import { format } from "date-fns";
import { useHover } from "@uidotdev/usehooks";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { useScheduleContext } from "../context-provider";

export const Spacer = styled.div`
  flex: ${(props) => props.flex || 0.2};
`;

function SidebarActions() {
  const { scheduleData, updateScheduleData, setModalOpen } =
    useScheduleContext();
  const [ref, hovering] = useHover();
  const monthYear = format(scheduleData.selectedDay, "MMMM yyyy");

  return (
    <div
      className="sidebar-actions-container"
      style={{
        flex: 0.8,
        padding: "8px 0px 8px 4px",
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      <div
        className="month-year"
        style={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: "12px",
          fontSize: "225%",
        }}
      >
        {monthYear}
      </div>
      <Spacer />
      <button
        className="add-event-button"
        ref={ref}
        style={{
          flex: 1,
          border: "none",
          borderRadius: "6px",
          fontSize: "20px",
          backgroundColor: "#7acc90",
          display: "flex",
          alignItems: "center",
          height: "76%",
          justifyContent: "center",
          color: "#ffffff",
          cursor: "pointer",
        }}
        onClick={() => setModalOpen(true)}
      >
        <FiPlus style={{ marginRight: "6px" }} />
        Event
      </button>
    </div>
  );
}

export default SidebarActions;
