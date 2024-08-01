import React from "react";
import { styled } from "styled-components";

import SelectPreview from "./select-preview";
import TextPreview from "./text-preview";
import ImagePreview from "./image-preview";
import NumberPreview from "./number-preview";
import CheckboxPreview from "./checkbox-preview";
import DatetimePreview from "./datetime-preview";
import SignaturePreview from "./signature-preview";
import CalculationPreview from "./calculation-preview";

const PreviewContainer = styled.div`
  min-height: 86px;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

function PreviewIndex({ selectedInputType, cellId }) {
  const inputSelectedAtCell = selectedInputType[`${cellId}`];
  // console.log("preview cellId: ", cellId);
  // console.log("selectedInputType: ", selectedInputType);
  // console.log("inputSelectedAtCell: ", inputSelectedAtCell);
  if (inputSelectedAtCell === "select")
    return (
      <PreviewContainer>
        <SelectPreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "text" || inputSelectedAtCell === "textarea")
    return (
      <PreviewContainer>
        <TextPreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "image")
    return (
      <PreviewContainer>
        <ImagePreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "number")
    return (
      <PreviewContainer>
        <NumberPreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "checkbox")
    return (
      <PreviewContainer>
        <CheckboxPreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "datetime")
    return (
      <PreviewContainer>
        <DatetimePreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "signature")
    return (
      <PreviewContainer>
        <SignaturePreview />
      </PreviewContainer>
    );
  if (inputSelectedAtCell === "calculation")
    return (
      <PreviewContainer>
        <CalculationPreview />
      </PreviewContainer>
    );

  return (
    <PreviewContainer>
      <div
        className="preview-no-input-selected"
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "rgba(0,0,0,0.4)",
          border: "1px dashed rgba(0,0,0,0.3)",
          borderRadius: "8px",
          width: "100%",
          height: "100%",
        }}
      >
        Select a type
      </div>
    </PreviewContainer>
  );
}

export default PreviewIndex;
