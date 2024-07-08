import React from "react";

import SelectDetail from "./select-detail";

function DetailsIndex({ selectedInputType }) {
  console.log("selectedInputType: ", selectedInputType);
  if (selectedInputType === "select") return <SelectDetail />;
  return;
}

export default DetailsIndex;
