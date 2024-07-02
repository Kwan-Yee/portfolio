import React from "react";
import { Input, Table } from "antd";

function DynamicTable() {
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
        size="medium"
        placeholder="Table header"
        addonBefore="Dynamic Table Header"
      />
      <Table style={{ marginBottom: "10px" }} />
    </div>
  );
}

export default DynamicTable;
