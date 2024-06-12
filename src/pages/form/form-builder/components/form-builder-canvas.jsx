import React, { useEffect } from "react";
import styled from "styled-components";

import ComponentRendererByRow from "./form-builder-canvas-component-renderer-by-row";
import FormHeaderInBuilder from "./form-builder-canvas-header";
import StickyMetadata from "./form-builder-canvas-sticky-metadata";
import CanvasActions from "./form-builder-canvas-actions";

const aspectRatioA4 = 1.414;

const FormBuilderContainer = styled.div`
  display: flex;
  flex: 9;
  padding: 16px 12px;
  overflow: auto;
  font-family: Roboto, sans-serif;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  background-color: #e6e6e6;
  justify-content: center;
  box-sizing: border-box;
`;

const FormPaperA4 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 8px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  min-height: 70.7vw;
  max-height: max-content;
  width: 50vw;
  box-sizing: border-box;
`;

/**
 *
 * @returns A canvas that contains a paper-like component providing preview of components being included for the form.
 */
function FormBuilderCanvas() {
  let renderedWidthOfA4Paper;
  useEffect(() => {
    renderedWidthOfA4Paper =
      document.getElementById("form-paper-A4").offsetWidth;
    // console.log( renderedWidthOfA4Paper);
  }, []);
  return (
    <FormBuilderContainer className="form-builder-canvas">
      <StickyMetadata />
      <FormPaperA4 id="form-paper-A4" className="form-paper-a4">
        <FormHeaderInBuilder />
        <ComponentRendererByRow />
      </FormPaperA4>
      <CanvasActions />
    </FormBuilderContainer>
  );
}

export default FormBuilderCanvas;
