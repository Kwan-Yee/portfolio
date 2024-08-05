import { Input } from "antd";
import React from "react";

function TextPreview() {
  //TODO: Render for both text and text area.
  return (
    <div className="preview-cell-container" style={{ width: "100%" }}>
      <Input size="small" placeholder="Input" />
    </div>
  );
}

export default TextPreview;