import React from "react";

import SelectDetail from "./select-detail";

function DetailsIndex({ selectedInputType, cellId }) {
  const inputSelectedAtCell = selectedInputType[`${cellId}`];
  // console.log("selectedInputType: ", selectedInputType);
  if (inputSelectedAtCell === "select") return <SelectDetail />;
  return;
}

export default DetailsIndex;
