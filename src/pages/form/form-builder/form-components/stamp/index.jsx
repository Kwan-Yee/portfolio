import React from "react";
import { Input } from "antd";

function Stamp() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <Input placeholder="Stamp header" addonBefore="Stamp Header" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          justifyContent: "space-between",
        }}
      >
        <Input.TextArea placeholder="Stamp note" style={{ flex: 2 }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
            fontStyle: "italic",
          }}
        >
          Stamp placement
        </div>
      </div>
    </div>
  );
}

export default Stamp;
