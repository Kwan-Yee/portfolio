import React, { useState } from "react";
import { Divider, Input, Select, Table } from "antd";
import { v4 as uuidv4 } from "uuid";

import DetailsCell from "./details";
import Preview from "./preview";

function DynamicTable() {
  const [columnsTBDefined, setColumnsTBDefined] = useState([
    {
      title: <Input size="middle" placeholder="Header" />,
      dataIndex: "column1",
      key: `${uuidv4()}_dcol`,
    },
    {
      title: <Input size="middle" placeholder="Header" />,
      dataIndex: "column2",
      key: `${uuidv4()}_dcol`,
    },
  ]);

  const inputExpected = [
    { value: "calculation", label: "Calculation" },
    { value: "checkbox", label: "Checkbox" },
    { value: "datetime", label: "Datetime" },
    { value: "image", label: "Image" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
    { value: "signature", label: "Signature" },
    { value: "text", label: "Text" },
    { value: "textarea", label: "Textarea" },
  ];

  const data = [
    {
      key: "input-type",
      column1: "input-type",
      column2: "input-type",
    },
  ];

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
      <Table
        pagination={false}
        style={{ marginBottom: "10px" }}
        columns={columnsTBDefined}
        dataSource={data}
        components={{
          body: {
            cell: () => {
              // console.log("props: ", props);
              const [selectedInputType, setSelectedInputType] = useState(null);
              return (
                <td>
                  Input type:
                  <Select
                    size="small"
                    placeholder="Input type"
                    options={inputExpected.sort()}
                    style={{ width: "100%" }}
                    onChange={(value) => setSelectedInputType(value)}
                  />
                  <Divider style={{ margin: "6px 0" }} />
                  <DetailsCell selectedInputType={selectedInputType} />
                  <Divider style={{ margin: "6px 0" }} />
                  <Preview selectedInputType={selectedInputType} />
                </td>
              );
            },
          },
        }}
      />
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
          addonBefore="Define Number of Columns"
          style={{ width: "32%" }}
        />
      </div>
    </div>
  );
}

export default DynamicTable;
