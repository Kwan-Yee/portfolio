import React, { useMemo } from "react";
import styled from "styled-components";

import SidebarHeader from "../components/sidebar-day-view-header";
import SidebarActions from "../components/sidebar-actions";
import { useScheduleContext } from "../context-provider";
import { generateHoursAndInterval } from "../utils/getters-day-view";
import HourBlock from "../components/sidebar-day-view-hour-block";

// Create styled components
const DayContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0px 3px 0px 0px;
  font-family: Arial, sans-serif;
  transition: flex 0.3s ease-in-out;
`;

const DayContentContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  flex: 10;
`;

/**
 *
 * @returns Sidebar for the selected day view which has a header (date and timezone) and a list of hours with 15-mins blocks.
 */
function SelectedDaySidebar() {
  const { scheduleData } = useScheduleContext();
  //   console.log(scheduleData.selectedDay);
  const hours = useMemo(
    () => generateHoursAndInterval(scheduleData.selectedDay),
    []
  );

  const { dayViewExpanded } = useScheduleContext();

  // TODO: Add
  return (
    <DayContainer
      style={{ flex: dayViewExpanded ? "8" : "3" }}
      className="day-container"
    >
      <SidebarActions />
      <SidebarHeader />
      <DayContentContainer>
        {hours.map((hour) => (
          <HourBlock
            key={hour.hour}
            hour={hour.hour}
            intervals={hour.intervals}
          />
        ))}
      </DayContentContainer>
    </DayContainer>
  );
}

export default SelectedDaySidebar;
