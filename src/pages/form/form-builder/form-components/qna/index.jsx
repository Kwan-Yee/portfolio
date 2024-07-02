import { Input } from "antd";
import React from "react";

function QnA() {
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
      <div>Answer type</div>
    </div>
  );
}

export default QnA;
