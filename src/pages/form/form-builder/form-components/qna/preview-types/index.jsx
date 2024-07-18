import React from "react";

import SelectPreview from "./select-preview";
import TextPreview from "./text-preview";
import ImagePreview from "./image-preview";
import NumberPreview from "./number-preview";
import CheckboxPreview from "./checkbox-preview";
import DatetimePreview from "./datetime-preview";
import SignaturePreview from "./signature-preview";
import CalculationPreview from "./calculation-preview";

function PreviewIndex({ selectedInputType }) {
  if (selectedInputType === "select") return <SelectPreview />;
  if (selectedInputType === "text" || selectedInputType === "textarea")
    return <TextPreview />;
  if (selectedInputType === "image") return <ImagePreview />;
  if (selectedInputType === "number") return <NumberPreview />;
  if (selectedInputType === "checkbox") return <CheckboxPreview />;
  if (selectedInputType === "datetime") return <DatetimePreview />;
  if (selectedInputType === "signature") return <SignaturePreview />;
  if (selectedInputType === "calculation") return <CalculationPreview />;
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
