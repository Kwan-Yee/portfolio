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
      <div className="form-header-container">Title</div>
      <div>Company Logo</div>
    </div>
  );
}

export default FormHeaderInBuilder;
