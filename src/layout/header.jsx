import React from "react";
import styled from "styled-components";

import NavItems from "./components/nav-items";

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
  justify-content: start;
`;

const HeaderProfile = styled.div`
  flex-basis: 5%;
  display: flex;
  justify-content: center;
`;

const routes = [
  // { name: "Landing", path: "/" },
  { name: "Document", path: "/document" },
  { name: "Form", path: "/form" },
  { name: "Schedule", path: "/schedule" },
  { name: "Communications", path: "/communications" },
];

function Header() {
  return (
    <HeaderContainer className="header">
      <HeaderLogo className="header-logo">Logo</HeaderLogo>
      <HeaderNav className="header-nav">
        {routes.map((route) => (
          <NavItems key={route.name} name={route.name} path={route.path} />
        ))}
      </HeaderNav>
      <HeaderProfile className="header-profile">Profile</HeaderProfile>
    </HeaderContainer>
  );
}

export default Header;
