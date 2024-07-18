import { Divider, Input, Select } from "antd";
import React from "react";

function QnA() {
  const inputExpected = [
    { value: "datetime", label: "Datetime" },
    { value: "image", label: "Image" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
    { value: "text", label: "Text" },
    { value: "textarea", label: "Textarea" },
  ];
  return (
    <div
      className="qna-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        padding: "4px",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
      }}
    >
      <Input size="medium" placeholder="Question" addonBefore="Question" />
      <div
        className="qna-answer-details-preview"
        style={{ display: "flex", gap: "8px" }}
      >
        <div
          className="qna-details"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          Input type:
          <Select
            size="small"
            style={{ width: "100%" }}
            placeholder="Input type"
            options={inputExpected}
          />
          Details:
          <div className="details-definition"> </div>
        </div>
        <div className="qna-preview" style={{ flex: 1 }}>
          Preview:
        </div>
      </div>
    </div>
  );
}

export default QnA;
