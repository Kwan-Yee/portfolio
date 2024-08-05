import { InputNumber } from "antd";
import React from "react";

function NumberPreview() {
  return (
    <div style={{ width: "100%" }}>
      <InputNumber size="small" style={{ width: "100%" }} placeholder="Numbers Only" />
    </div>
  );
}

export default NumberPreview;
