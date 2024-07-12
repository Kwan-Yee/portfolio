import { Input } from "antd";
import React, { useState } from "react";

function Signature({ compId }) {
  const [sigCompState, setSigCompState] = useState(
    localStorage.getItem(compId)
      ? JSON.parse(localStorage.getItem(compId))
      : null
  );
  const handleSignInput = (value, modifiedInput) => {
    setSigCompState((prev) => {
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
        placeholder="Signature header"
        addonBefore="Signature Header"
        value={sigCompState?.header}
        onChange={(e) => handleSignInput(e.target.value, "header")}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          justifyContent: "space-between",
        }}
      >
        <Input.TextArea
          placeholder="Signature note"
          style={{ flex: 2 }}
          value={sigCompState?.notes}
          onChange={(e) => handleSignInput(e.target.value, "notes")}
        />
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
