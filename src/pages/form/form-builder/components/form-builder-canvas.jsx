import React, { useEffect } from "react";
import styled from "styled-components";

const aspectRatioA4 = 1.414;

const FormBuilderContainer = styled.div`
  display: flex;
  flex: 9;
  padding: 16px 12px;
  overflow: auto;
  font-family: Roboto, sans-serif;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: rgba(230, 230, 230, 0.25);
  justify-content: center;
  box-sizing: border-box;
`;

const FormPaperA4 = styled.div`
  display: flex;
  padding: 4px 6px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  height: 70.7vw;
  width: 50vw;
`;

function FormBuilderCanvas() {
  let renderedWidthOfA4Paper;
  useEffect(() => {
    renderedWidthOfA4Paper =
      document.getElementById("form-paper-A4").offsetWidth;
    console.log(typeof renderedWidthOfA4Paper);
  }, []);
  return (
    <FormBuilderContainer className="form-builder-canvas">
      <FormPaperA4 id="form-paper-A4" className="form-paper-a4" />
    </FormBuilderContainer>
  );
}

export default FormBuilderCanvas;
