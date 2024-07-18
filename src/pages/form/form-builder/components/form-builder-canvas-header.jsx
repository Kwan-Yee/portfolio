import { Input } from "antd";
import React from "react";

function FormHeaderInBuilder() {
  return (
    <div
      className="form-header-container"
      style={{
        height: "68px",
        display: "flex",
        flexBasis: "64px",
        flexDirection: "row",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/**TODO: bind this input with the metadata title through form builder context */}
      <Input
        className="form-title-container"
        style={{ flex: 3, margin: "6px 8px 8px 0px", fontSize: "22px" }}
        maxLength={55}
        placeholder="Form Title"
      />
      <div className="form-logo-container" style={{ flex: 1 }}>
        Company Logo
      </div>
    </div>
  );
}

export default FormHeaderInBuilder;
