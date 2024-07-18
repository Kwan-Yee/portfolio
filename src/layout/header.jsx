import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import NavItems from "./components/nav-items";
import { Avatar, Button, Divider, Dropdown, Menu, Space } from "antd";
import { useFullAppContext } from "../context-provider";
import { useHover } from "@uidotdev/usehooks";

const HeaderContainer = styled.div`
  height: 58px;
  width: 100%;
  background-color: #e6e6e6;
  border-bottom: 2px solid #5b5b5b;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const HeaderNav = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const HeaderProfile = styled.div`
  flex-basis: 5%;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

function Header() {
  const { selectedModule, setSelectedModule } = useFullAppContext();

  const operationRoutes = [
    { label: "Permits", key: "permits" },
    { label: "Inspections", key: "inspections" },
    { label: "Violations", key: "violations" },
    { label: "Incidents", key: "incidents" },
  ];
  const designRoutes = [
    { label: "Register", key: "register" },
    { label: "Transmittals", key: "transmittals" },
    { label: "Technical Queries", key: "technical_queries" },
  ];
  const siteRoutes = [
    {
      label: "Issues",
      key: "issues",
    },
    {
      label: "Assets",
      key: "assets",
    },
  ];

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "calendar", label: "Calendar" },
    {
      key: "site",
      label: "Site",
      children: siteRoutes,
    },
    {
      key: "qshe",
      label: "QSHE",
      children: operationRoutes,
    },
    {
      key: "drawings",
      label: "Drawings",
      children: designRoutes,
    },
  ];

  const navigate = useNavigate();

  const navHandler = (keyPath) => {
    if (keyPath.length == 1 && keyPath.includes("home")) {
      navigate("/");
      return;
    }
    // build nav path from keyPath
    // console.log("keyPath: ", keyPath);
    let path = "";
    for (let i = keyPath.length - 1; i > -1; i--) {
      path = path.concat(`${"/" + keyPath[i].toLowerCase()}`);
    }

    console.log("path: ", path);
    navigate(path);
    return;
  };
  return (
    <HeaderContainer className="header">
      <HeaderNav className="header-nav">
        <Menu
          selectedKeys={selectedModule}
          mode="horizontal"
          items={menuItems}
          style={{
            width: "100%",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={(e) => {
            console.log(e);
            navHandler(e.keyPath);
            setSelectedModule(e.key.toLowerCase());
          }}
        />
      </HeaderNav>
      <HeaderProfile className="header-profile">
        <Avatar size={36} />
      </HeaderProfile>
    </HeaderContainer>
  );
}

export default Header;
