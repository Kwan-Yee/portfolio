import React from "react";

import PreviewIndex from "./preview-types";

function Preview({ selectedInputType, cellId }) {
  return (
    <div
      className="preview-cell-container"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      Preview:
      <PreviewIndex selectedInputType={selectedInputType} cellId={cellId} />
    </div>
  );
}

export default Preview;
