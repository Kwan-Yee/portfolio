import React from "react";

import PreviewIndex from "./preview-types";

function Preview({ selectedInputType }) {
  return (
    <div
      className="preview-cell-container"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      Preview:
      <PreviewIndex selectedInputType={selectedInputType} />
    </div>
  );
}

export default Preview;