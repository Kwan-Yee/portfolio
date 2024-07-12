import React, { useState } from "react";
import { Input } from "antd";

function Stamp({ compId }) {
  const [stampCompState, setStampCompState] = useState(
    localStorage.getItem(compId)
      ? JSON.parse(localStorage.getItem(compId))
      : null
  );
  const handleStampInput = (value, modifiedInput) => {
    setStampCompState((prev) => {
      return { ...prev, [modifiedInput]: value };
    });
    console.log(value);
    const item = JSON.parse(localStorage.getItem(compId));
    if (!item) return;
    if (modifiedInput === "header") item.header = value;
    if (modifiedInput === "notes") item.notes = value;
    localStorage.setItem(compId, JSON.stringify(item));
  };
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
      <Input
        placeholder="Stamp header"
        addonBefore="Stamp Header"
        value={stampCompState?.header}
        onChange={(e) => handleStampInput(e.target.value, "header")}
      />
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
          value={stampCompState?.header}
          onChange={(e) => handleStampInput(e.target.value, "notes")}
        >
          Stamp placement
        </div>
      </div>
    </div>
  );
}

export default Stamp;
