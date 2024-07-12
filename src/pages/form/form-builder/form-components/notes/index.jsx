import React, { useState } from "react";
import { Input } from "antd";

function Notes({ compId }) {
  const [noteCompState, setNoteCompState] = useState(
    localStorage.getItem(compId)
      ? JSON.parse(localStorage.getItem(compId))
      : null
  );
  const handleNotesInput = (value, modifiedInput) => {
    setNoteCompState((prev) => {
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
      <Input
        addonBefore="Notes Header"
        placeholder="Notes Header"
        value={noteCompState.header}
        onChange={(e) => {
          handleNotesInput(e.target.value, "header");
        }}
      />
      <Input.TextArea
        value={noteCompState.notes}
        onChange={(e) => {
          handleNotesInput(e.target.value, "notes");
        }}
      />
    </div>
  );
}

export default Notes;
