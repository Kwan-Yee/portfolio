import React, { useEffect } from "react";
import styled from "styled-components";

import ComponentRenderer from "./form-builder-canvas-component-drop";
import FormHeaderInBuilder from "./form-builder-canvas-header";
import StickyMetadata from "./form-builder-canvas-sticky-metadata";
import CanvasActions from "./form-builder-canvas-actions";
import { useFormBuilderContext } from "../../context-provider";

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
  height: 70.7vw;
  // max-height: max-content;
  width: 50vw;
  // box-sizing: border-box;
  margin-bottom: 5px;
`;

/**
 *
 * @returns A canvas that contains a paper-like component providing preview of components being included for the form.
 */
function FormBuilderCanvas() {
  const { formPage } = useFormBuilderContext();
  console.log(formPage);
  return (
    <FormBuilderContainer className="form-builder-canvas">
      <StickyMetadata />
      <div
        className="form-paper-container"
        style={{ minHeight: `calc(${70.7 * formPage.length})vw` }}
      >
        {formPage.map((page, index) => (
          <FormPaperA4 id="form-paper-A4" className="form-paper-a4">
            <FormHeaderInBuilder />
            <ComponentRenderer
              committedComponents={page.committedComponents}
              formPageNum={index}
              gridsOccupied={page.gridsOccupied}
              gridsToBeDropped={page.gridsToBeDropped}
            />
          </FormPaperA4>
        ))}
      </div>
      <CanvasActions />
    </FormBuilderContainer>
  );
}

export default FormBuilderCanvas;
