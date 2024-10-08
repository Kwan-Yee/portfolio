import React from "react";
import styled from "styled-components";

import FormBuilderCanvas from "./components/form-builder-canvas";
import SidebarComponentList from "./components/superseded/sidebar-components-list";

const FormBuilderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

function FormBuilder() {
  //TODO: Remove sidebar component list
  return (
    <FormBuilderContainer className="form-builder-container">
      <FormBuilderCanvas>canvas</FormBuilderCanvas>
      {/* <SidebarComponentList className="component-list" /> */}
    </FormBuilderContainer>
  );
}

export default FormBuilder;
