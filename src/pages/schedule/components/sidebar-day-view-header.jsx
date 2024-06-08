import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { FiMaximize, FiMinimize } from "react-icons/fi";
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
  padding-left: 13px;
`;

const ExpandButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 6px;
  max-width: 28px;
  transition: all 0.3s ease-in-out;
  flex-basis: 28px;
  flex-grow: 0;
`;

/**
 *
 * @returns Header that displays date and timezone
 */

function SidebarHeader() {
  const { scheduleData, updateScheduleData } = useScheduleContext();
  const [ref, hovering] = useHover();
  const currentTimezone = format(scheduleData.currentDay, "O");
  // console.log(scheduleData.selectedDay);

  const { dayViewExpanded, setDayViewExpanded } = useScheduleContext();

  return (
    <SidebarHeaderContainer className="sidebar-header-container">
      <TimezoneBox className="time-zone">{currentTimezone}</TimezoneBox>
      <DatePicker
        allowClear={false}
        defaultValue={dayjs(scheduleData.selectedDay)}
        onChange={(dateObj) => {
          updateScheduleData({
            ...scheduleData,
            selectedDay: new Date(dateObj),
          });
        }}
        style={{
          border: "2px solid #5b5b5b",
          borderRadius: "14px",
          flexBasis: "17vw",
          flexGrow: 0,
          fontFamily: "Roboto, sans-serif",
        }}
      />
      <ExpandButton
        ref={ref}
        onClick={() => setDayViewExpanded(!dayViewExpanded)}
      >
        {!dayViewExpanded ? (
          <FiMaximize
            style={{ transform: hovering ? "scale(1.35)" : "scale(1.2)" }}
          />
        ) : (
          <FiMinimize
            style={{ transform: hovering ? "scale(1.35)" : "scale(1.2)" }}
          />
        )}
      </ExpandButton>
    </SidebarHeaderContainer>
  );
}

export default SidebarHeader;
