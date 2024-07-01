import React from "react";
import styled from "styled-components";

import listOfComponents from "../../../../../mock-data-provider/list-of-components";
import SidebarComponentItem from "./sidebar-components-item";

// Define the styled components
const SidebarContainer = styled.div`
  flex: 2;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 4px 6px;
  font-family: "Roboto", sans-serif;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
`;

function SidebarComponentList() {
  return (
    <SidebarContainer className="components-sidebar-coontainer">
      <ListContainer className="components-list-container">
        {listOfComponents.map((component) => (
          <SidebarComponentItem key={component.name} component={component} />
        ))}
      </ListContainer>
    </SidebarContainer>
  );
}

export default SidebarComponentList;
