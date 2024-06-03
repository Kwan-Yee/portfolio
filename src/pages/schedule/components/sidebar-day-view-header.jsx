import React from "react";
import { format } from "date-fns";
import { useScheduleContext } from "../context-provider";
import styled from "styled-components";

const SidebarHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 47px;
  font-family: Arial, sans-serif;
`;

const TimezoneBox = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.div`
  flex: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 *
 * @returns Header that displays date and timezone
 */

function SidebarHeader() {
  const { scheduleData } = useScheduleContext();
  const currentTimezone = format(scheduleData.currentDay, "O");
  const selectedDate = format(scheduleData.selectedDay, "PPPP");
  return (
    <SidebarHeaderContainer>
      <TimezoneBox>{currentTimezone}</TimezoneBox>
      <DateContainer>{selectedDate}</DateContainer>
    </SidebarHeaderContainer>
  );
}

export default SidebarHeader;
