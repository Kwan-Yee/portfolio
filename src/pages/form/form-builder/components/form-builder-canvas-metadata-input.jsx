import React from "react";
import { Input } from "antd";

function MetadataInputRow({ title, edittable = true }) {
  // console.log(title);
  return (
    <div
      className="metadata-input-item"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#5b5b5b",
        }}
      >
        {title}
      </div>
      <Input size="small" placeholder={title} disabled={!edittable} />
    </div>
  );
}

export default MetadataInputRow;
