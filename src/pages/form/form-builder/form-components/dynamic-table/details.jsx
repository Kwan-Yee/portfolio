import { Input } from "antd";
import React from "react";

import DetailsIndex from "./details-types";

function DetailsCell({ selectedInputType, cellId }) {
  return (
    //TODO: Define width of column, and other definitions relevant to the selected input type
    <div
      className="input-type-details-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        flexBasis: "48px",
      }}
    >
      <Input size="small" placeholder="Width" />
      {/**If input type == select*/}
      <DetailsIndex selectedInputType={selectedInputType} cellId={cellId} />
    </div>
  );
}

export default DetailsCell;
