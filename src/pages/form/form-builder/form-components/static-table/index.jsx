import React, { useState } from "react";
import { Table, Input } from "antd";

const baseColumns = [];

function StaticTable() {
  // const [dragIndex, setDragIndex] = useState({ active: -1, over: -1 });
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
        addonBefore="Static Table Header"
      />
      <Table style={{}} pagination={false} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Input
          size="small"
          defaultValue={1}
          addonBefore="Define Number of Rows"
          style={{ width: "32%" }}
        />
      </div>
    </div>
  );
}

export default StaticTable;
