import React from "react";

import SelectPreview from "./select-preview";
import TextPreview from "./text-preview";
import ImagePreview from "./image-preview";
import NumberPreview from "./number-preview";
import CheckboxPreview from "./checkbox-preview";
import DatetimePreview from "./datetime-preview";
import SignaturePreview from "./signature-preview";
import CalculationPreview from "./calculation-preview";

function PreviewIndex({ selectedInputType, cellId }) {
  const inputSelectedAtCell = selectedInputType[`${cellId}`];
  console.log("preview cellId: ", cellId);
  console.log("selectedInputType: ", selectedInputType);
  console.log("inputSelectedAtCell: ", inputSelectedAtCell);
  if (inputSelectedAtCell === "select") return <SelectPreview />;
  if (inputSelectedAtCell === "text" || inputSelectedAtCell === "textarea")
    return <TextPreview />;
  if (inputSelectedAtCell === "image") return <ImagePreview />;
  if (inputSelectedAtCell === "number") return <NumberPreview />;
  if (inputSelectedAtCell === "checkbox") return <CheckboxPreview />;
  if (inputSelectedAtCell === "datetime") return <DatetimePreview />;
  if (inputSelectedAtCell === "signature") return <SignaturePreview />;
  if (inputSelectedAtCell === "calculation") return <CalculationPreview />;

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
