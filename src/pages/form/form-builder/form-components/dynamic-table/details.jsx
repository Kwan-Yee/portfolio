import { Input } from "antd";
import React from "react";

import DetailsIndex from "./details-types";

function DetailsCell({ selectedInputType }) {
  return (
    //TODO: Define width of column, and other definitions relevant to the selected input type
    <div
      className="input-type-details-container"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      Details:
      <Input size="small" placeholder="30px" addonBefore="Width" />
      {/**If input type == select*/}
      <DetailsIndex selectedInputType={selectedInputType} />
    </div>
  );
}

export default DetailsCell;
