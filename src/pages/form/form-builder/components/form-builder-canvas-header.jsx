import React from "react";

function FormHeaderInBuilder() {
  return (
    <div
      className="form-header-container"
      style={{
        height: "68px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div className="form-header-container">Title</div>
      <div>Company Logo</div>
    </div>
  );
}

export default FormHeaderInBuilder;
