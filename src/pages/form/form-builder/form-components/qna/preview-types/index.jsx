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
  // min-height: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function PreviewIndex({ selectedInputType }) {
  if (selectedInputType === "select")
    return (
      <PreviewContainer>
        <SelectPreview />
      </PreviewContainer>
    );
  if (selectedInputType === "text" || selectedInputType === "textarea")
    return (
      <PreviewContainer>
        <TextPreview />
      </PreviewContainer>
    );
  if (selectedInputType === "image")
    return (
      <PreviewContainer>
        <ImagePreview />
      </PreviewContainer>
    );
  if (selectedInputType === "number")
    return (
      <PreviewContainer>
        <NumberPreview />
      </PreviewContainer>
    );
  if (selectedInputType === "checkbox")
    return (
      <PreviewContainer>
        <CheckboxPreview />
      </PreviewContainer>
    );
  if (selectedInputType === "datetime")
    return (
      <PreviewContainer>
        <DatetimePreview />
      </PreviewContainer>
    );
  if (selectedInputType === "signature")
    return (
      <PreviewContainer>
        <SignaturePreview />
      </PreviewContainer>
    );
  if (selectedInputType === "calculation")
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
