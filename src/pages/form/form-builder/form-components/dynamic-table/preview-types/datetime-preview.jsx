import { DatePicker, Switch } from "antd";
import React, { useState } from "react";

function DatetimePreview() {
  const [showTime, setShowTime] = useState(false);
  return (
    <div
      className="datetime-preview-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <DatePicker size="small" style={{ flex: 10 }} showTime={showTime} />
      <div
        className="datetime-preview-switch-container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#5b5b5b",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Time
        </p>
        <Switch
          style={{ margin: "0 4px" }}
          size="small"
          onChange={() => setShowTime(!showTime)}
        />
      </div>
    </div>
  );
}

export default DatetimePreview;
