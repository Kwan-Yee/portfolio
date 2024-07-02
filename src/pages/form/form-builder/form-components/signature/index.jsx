import { Input } from "antd";
import React from "react";

function Signature() {
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
      <Input placeholder="Signature header" addonBefore="Signature Header" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          justifyContent: "space-between",
        }}
      >
        <Input.TextArea placeholder="Signature note" style={{ flex: 2 }} />
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
          Signature placement
        </div>
      </div>
    </div>
  );
}

export default Signature;
