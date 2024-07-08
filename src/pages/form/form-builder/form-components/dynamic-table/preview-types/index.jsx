import React from "react";

import SelectPreview from "./select-preview";

function PreviewIndex({ selectedInputType }) {
  if (selectedInputType === "select") return <SelectPreview />;
  return (
    <div
      className="preview-no-input-selected"
      style={{
        textAlign: "center",
        fontStyle: "italic",
        color: "rgba(0,0,0,0.4)",
        border: "1px dashed rgba(0,0,0,0.3)",
        borderRadius: "8px",
      }}
    >
      Select a type
    </div>
  );
}

export default PreviewIndex;
