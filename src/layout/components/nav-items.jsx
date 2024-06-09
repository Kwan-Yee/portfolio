import React from "react";
import { useNavigate } from "react-router-dom";
import { useHover } from "@uidotdev/usehooks";
import styled from "styled-components";

// Define the styled component
const NavItemContainer = styled.div`
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: ${(props) =>
    props.hovering ? "rgba(255,255,255,0.3)" : "transparent"};
  text-decoration-line: ${(props) => (props.hovering ? "underline" : "none")};
  text-decoration-thickness: 2px;
`;

function NavItems({ name, path }) {
  const navigate = useNavigate();
  const [ref, hovering] = useHover();
  return (
    <NavItemContainer
      ref={ref}
      hovering={hovering}
      onClick={() => navigate(path)}
    >
      {name}
    </NavItemContainer>
  );
}

export default NavItems;
