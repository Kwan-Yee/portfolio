import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";

function Layout() {
  return (
    <div className="app-layout" style={{ height: "100%", overflow: "initial" }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
