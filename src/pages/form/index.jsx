import React, { useCallback } from "react";
import { Outlet } from "react-router-dom";

import NavLayout from "./nav-layout";

function FormLanding() {
  return (
    <div
      className="form-page-container"
      style={{
        display: "flex",
        padding: "6px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <NavLayout />

      <div
        className="conditional-builder-or-usage-container"
        style={{ flex: 11, padding: "6px", boxSizing: "border-box" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default FormLanding;
