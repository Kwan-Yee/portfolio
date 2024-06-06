import React from "react";

import DraggableDayEventCell from "./sidebar-day-view-event-cell-drag";

function IndividualEventContainer({ event }) {
  //   console.log(event);
  const startTimeSpacer = (eventThisHour) => {
    if (!eventThisHour.startTime) return;
    const startTime = eventThisHour.startTime;
    const minuteOfTheHour = parseInt(startTime.split(":")[1]);
    let spacerHeightPercent = 0;
    let pixelModifier = 0;

    if (minuteOfTheHour) {
      console.log("minute: ", minuteOfTheHour);
      spacerHeightPercent = (minuteOfTheHour / 60) * 100;
    }
    console.log("percent: ", spacerHeightPercent);

    if (spacerHeightPercent < 25) {
      pixelModifier = 0;
    } else if (spacerHeightPercent >= 75) {
      pixelModifier = 2;
    } else if (spacerHeightPercent >= 25) {
      pixelModifier = 1;
    }

    return {
      spacerHeightPercent: spacerHeightPercent,
      pixelModifier: pixelModifier,
    };
  };

  const { spacerHeightPercent, pixelModifier } = startTimeSpacer(event);
  console.log(spacerHeightPercent, pixelModifier);
  return (
    <div
      key={event.id}
      className="individual-event-container"
      style={{
        height: "calc(100% - 2px)",
        marginTop: "0.5px",
        flex: 1,
        minWidth: "36px",
        pointerEvents: "none",
      }}
    >
      <div
        className="event-spacer"
        style={{
          height: `calc(${spacerHeightPercent}% + ${pixelModifier}px)`,
          pointerEvents: "none",
        }}
      ></div>
      <DraggableDayEventCell key={event.id} event={event} />
    </div>
  );
}

export default IndividualEventContainer;
