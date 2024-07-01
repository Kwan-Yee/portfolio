import React from "react";
import { Input } from "antd";

function Notes() {
  return (
    <div
      className="notes-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <div className="notes-title">Notes</div>
      <Input.TextArea />
    </div>
  );
}

export default Notes;
