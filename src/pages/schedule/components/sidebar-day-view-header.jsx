import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { FiMaximize } from "react-icons/fi";
import { useHover } from "@uidotdev/usehooks";
import { FiChevronsDown } from "react-icons/fi";

import { useScheduleContext } from "../context-provider";
import { Spacer } from "./sidebar-actions";

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
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;

const DateContainer = styled.div`
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 12px;
  padding: 4px 0px 4px 3px;
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
  const selectedDate = format(scheduleData.selectedDay, "PPPP");
  return (
    <SidebarHeaderContainer className="sidebar-header-container">
      <TimezoneBox>{currentTimezone}</TimezoneBox>
      <DateContainer>
        {selectedDate}
        <Spacer />
        <FiChevronsDown />
      </DateContainer>
      <ExpandButton ref={ref}>
        <FiMaximize
          style={{ transform: hovering ? "scale(1.35)" : "scale(1.2)" }}
        />
      </ExpandButton>
    </SidebarHeaderContainer>
  );
}

export default SidebarHeader;
