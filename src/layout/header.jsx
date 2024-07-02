import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import NavItems from "./components/nav-items";
import { Divider } from "antd";
import { useFullAppContext } from "../context-provider";
import { useHover } from "@uidotdev/usehooks";

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
  position: sticky;
  top: 0;
  z-index: 999;
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

  const [ref, hovering] = useHover();

  const navigate = useNavigate();
  return (
    <HeaderContainer className="header">
      <HeaderLogo
        className="header-home"
        onClick={() => {
          navigate("/");
          setSelectedModule("Landing");
        }}
        ref={ref}
        style={{
          backgroundColor: hovering ? "rgba(255,255,255,0.3)" : "transparent",
          textDecorationLine:
            selectedModule === "Landing" || hovering ? "underline" : "none",
          textDecorationThickness: "2px",
          height: "34px",
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
          className="header-ops-nav-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            className="header-ops-category"
            style={{ flexBasis: "8px", fontSize: "10px" }}
          >
            Safety & Quality
          </div>
          <div
            className="header-ops-routes"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {operationRoutes.map((route) => (
              <NavItems key={route.path} name={route.name} path={route.path} />
            ))}
          </div>
        </div>
        <Divider
          type="vertical"
          style={{ backgroundColor: "white", height: "18px" }}
        />
        <div
          className="header-dnt-nav"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div
            className="header-design-category"
            style={{ flexBasis: "8px", fontSize: "10px" }}
          >
            Design
          </div>
          <div
            className="header-design-routes"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {designRoutes.map((route) => (
              <NavItems key={route.path} name={route.name} path={route.path} />
            ))}
          </div>
        </div>
      </HeaderNav>
      <HeaderProfile className="header-profile">Profile</HeaderProfile>
    </HeaderContainer>
  );
}

export default Header;
