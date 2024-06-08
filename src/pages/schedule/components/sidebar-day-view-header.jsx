import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { FiMaximize } from "react-icons/fi";
import { useHover } from "@uidotdev/usehooks";

import { useScheduleContext } from "../context-provider";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const SidebarHeaderContainer = styled.div`
  display: flex;
  flex: 0.4;
  flex-direction: row;
  font-family: Arial, sans-serif;
  margin: 0px 0px 8px 0px;
`;

const TimezoneBox = styled.div`
  flex: 3;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 11px;
  padding-left: 9px;
`;

const ExpandButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 6px;
`;

/**
 *
 * @returns Header that displays date and timezone
 */

function SidebarHeader() {
  const { scheduleData } = useScheduleContext();
  const [ref, hovering] = useHover();
  const currentTimezone = format(scheduleData.currentDay, "O");
  // console.log(scheduleData.selectedDay);

  return (
    <SidebarHeaderContainer className="sidebar-header-container">
      <TimezoneBox className="time-zone">{currentTimezone}</TimezoneBox>
      <DatePicker
        defaultValue={dayjs(scheduleData.selectedDay)}
        style={{
          border: "1px solid #5b5b5b",
          flex: 7,
          borderRadius: "14px",
          maxWidth: "30vh",
        }}
      />
      <ExpandButton ref={ref}>
        <FiMaximize
          style={{ transform: hovering ? "scale(1.35)" : "scale(1.2)" }}
        />
      </ExpandButton>
    </SidebarHeaderContainer>
  );
}

export default SidebarHeader;
