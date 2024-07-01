import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import NavItems from "./components/nav-items";
import { Divider } from "antd";
import { useFullAppContext } from "../context-provider";

const HeaderContainer = styled.div`
  height: 58px;
  background-color: #202129;
  width: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
`;

const HeaderLogo = styled.div`
  flex-basis: 7%;
  display: flex;
  justify-content: center;
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
`;

const commonRoutes = [
  { name: "Document", path: "/document" },
  { name: "Timeline", path: "/schedule" },
];

const operationRoutes = [
  // { name: "Landing", path: "/" },
  { name: "Permits", path: "/permits" },
  { name: "Inspections", path: "/inspections" },
  { name: "Violations", path: "/violations" },
  { name: "Incidents", path: "/incidents" },
];

const designRoutes = [
  { name: "Transmittals", path: "/transmittals" },
  { name: "Technical Queries", path: "/technical-queries" },
];

function Header() {
  const { selectedModule, setSelectedModule } = useFullAppContext();
  console.log("selectedModule: ", selectedModule);

  const navigate = useNavigate();
  return (
    <HeaderContainer className="header">
      <HeaderLogo
        className="header-logo"
        onClick={() => {
          navigate("/");
          setSelectedModule("Landing");
        }}
        style={{
          backgroundColor:
            selectedModule === "Landing"
              ? "rgba(255,255,255,0.3)"
              : "transparent",
          textDecorationLine:
            selectedModule === "Landing" ? "underline" : "none",
          textDecorationThickness: "2px",
          height: "43px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Home
      </HeaderLogo>
      <HeaderNav className="header-nav">
        <div
          className="header-com-nav"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          {commonRoutes.map((route) => (
            <NavItems key={route.path} name={route.name} path={route.path} />
          ))}
        </div>
        <Divider
          type="vertical"
          style={{ backgroundColor: "white", height: "18px" }}
        />
        <div
          className="header-ops-nav"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          {operationRoutes.map((route) => (
            <NavItems key={route.path} name={route.name} path={route.path} />
          ))}
        </div>
        <Divider
          type="vertical"
          style={{ backgroundColor: "white", height: "18px" }}
        />
        <div
          className="header-dnt-nav"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          {designRoutes.map((route) => (
            <NavItems key={route.path} name={route.name} path={route.path} />
          ))}
        </div>
      </HeaderNav>
      <HeaderProfile className="header-profile">Profile</HeaderProfile>
    </HeaderContainer>
  );
}

export default Header;
