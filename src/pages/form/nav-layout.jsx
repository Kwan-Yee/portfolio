import React from "react";
import styled from "styled-components";

import LeftNavItem from "./form-builder/components/left-nav-item";

const LeftTabContainer = styled.div`
  flex-basis: 60px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #e6e6e6;
  padding: 6px 4px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function NavLayout() {
  return (
    <LeftTabContainer className="left-tab-container">
      {["Register", "Builder", "Workflow"].map((item) => (
        <LeftNavItem key={item} item={item} />
      ))}
    </LeftTabContainer>
  );
}

export default NavLayout;
