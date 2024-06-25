import React, { useEffect } from "react";
import styled from "styled-components";
import { useHover } from "@uidotdev/usehooks";
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";

import SectionRenderer from "./form-builder-canvas-section-renderer";
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
  height: max-content;
  width: 50vw;
  box-sizing: border-box;
`;

const SectionAdder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-basis: 46px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.4);
  border: 2px dashed rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 10px;
  flex-shrink: 0;
`;

/**
 *
 * @returns A canvas that contains a paper-like component providing preview of components being included for the form.
 */
function FormBuilderCanvas() {
  const { setSections } = useFormBuilderContext();
  const handleSectionAdder = () => {
    console.log("clicked +");
    const newSectionId = `${uuidv4()}_Section`;
    setSections((prev) => {
      localStorage.setItem("sections", JSON.stringify([...prev, newSectionId]));

      [...prev, newSectionId].forEach((id) => {
        if (!localStorage.getItem(id)) {
          localStorage.setItem(
            id,
            JSON.stringify({ title: "", children: [], id: id })
          ); 
        }
      });
      return [...prev, newSectionId];
    });
  };
  const [ref, hovering] = useHover();
  return (
    <FormBuilderContainer className="form-builder-canvas">
      <StickyMetadata />
      <FormPaperA4 id="form-paper-A4" className="form-paper-a4">
        <FormHeaderInBuilder />
        <SectionRenderer />
        <SectionAdder
          ref={ref}
          style={{
            backgroundColor: hovering ? "rgba(91, 91, 91, 0.3)" : "transparent",
          }}
          onClick={handleSectionAdder}
        >
          +
        </SectionAdder>
      </FormPaperA4>
      <CanvasActions />
    </FormBuilderContainer>
  );
}

export default FormBuilderCanvas;
