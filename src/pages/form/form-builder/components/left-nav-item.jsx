import React from "react";
import styled from "styled-components";
import { useHover } from "@uidotdev/usehooks";

import { useNavigate, useLocation } from "react-router-dom";

const NavItem = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  margin: 3px 0px;
  box-sizing: border-box;
`;

function LeftNavItem({ item }) {
  const [ref, hovering] = useHover();
  const navigate = useNavigate();
  const { pathname: activeTab } = useLocation();

  return (
    <NavItem
      ref={ref}
      style={{
        backgroundColor: hovering ? "rgba(91, 91, 91, 0.3)" : null,
        border: activeTab.includes(item.toLowerCase())
          ? "2px solid rgba(91, 91, 91, 0.7)"
          : "2px solid transparent",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/form/${item.toLowerCase()}`);
      }}
    >
      {item}
    </NavItem>
  );
}

export default LeftNavItem;
