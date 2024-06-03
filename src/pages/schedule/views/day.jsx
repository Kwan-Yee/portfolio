import React, { useMemo } from "react";
import styled from "styled-components";

import SidebarHeader from "../components/sidebar-day-view-header";
import { useScheduleContext } from "../context-provider";
import { generateHoursAndInterval } from "../utils/getters-day-view";
import HourBlock from "../components/sidebar-day-view-hour-block";

// Create styled components
const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 21px 3px 3px 9px;
  font-family: Arial, sans-serif;
`;

const DayContentContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

function SelectedDaySidebar() {
  const { scheduleData } = useScheduleContext();
  //   console.log(scheduleData.selectedDay);
  const hours = useMemo(
    () => generateHoursAndInterval(scheduleData.selectedDay),
    []
  );
  return (
    <DayContainer>
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
