import React from "react";
import { useNavigate } from "react-router-dom";
import { useHover } from "@uidotdev/usehooks";
import styled from "styled-components";

import { useFullAppContext } from "../../context-provider";

// Define the styled component
const NavItemContainer = styled.div`
  cursor: pointer;
  margin-right: 5px;
  box-sizing: border-box;
  margin-left: 5px;
  margin-top: 2px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration-thickness: 2px;
`;

function NavItems({ name, path, selectedRoute }) {
  const navigate = useNavigate();
  const [ref, hovering] = useHover();

  const { selectedModule, setSelectedModule } = useFullAppContext();
  return (
    <NavItemContainer
      onClick={() => {
        navigate(path);
        setSelectedModule(name);
      }}
      style={{
        backgroundColor: hovering ? "rgba(255,255,255,0.3)" : "transparent",
        textDecorationLine:
          hovering || selectedModule === name ? "underline" : "none",
      }}
      ref={ref}
    >
      {name}
    </NavItemContainer>
  );
}

export default NavItems;
