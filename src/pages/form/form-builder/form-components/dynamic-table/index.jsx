import React, { useEffect, useRef, useState } from "react";
import { Divider, Input, Select, Table, Tooltip } from "antd";
import { v4 as uuidv4 } from "uuid";
import { MdAddCircleOutline } from "react-icons/md";

import DetailsCell from "./details";
import Preview from "./preview";
import { getRenderPropValue } from "antd/es/_util/getRenderPropValue";
import { Header } from "antd/es/layout/layout";

function DynamicTable() {
  // const [columnsTBDefined, setColumnsTBDefined] = useState([
  //   {
  //     // dataIndex: "column1",
  //     key: `${uuidv4()}_dcol`,
  //   },
  //   {
  //     // dataIndex: "column2",
  //     key: `${uuidv4()}_dcol`,
  //   },
  // ]);

  const [tableData, setTableData] = useState({
    columns: [{ id: 1, }, { id: 2 }],
    rows: [{ id: uuidv4(), cells: [{ id: 1 }, { id: 2 }] }],
  });

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

  //TODO: initialise the states of input with LS data so it persists across refresh and accidental rerender
  //TODO: the addition of columns will be to add column and row cell

  // const [data, setData] = useState([
  //   {
  //     key: "input-type",
  //     column1: "input-type",
  //     column2: "input-type",
  //   },
  // ]);

  const handleAddColumn = (event) => {
    let index;
    // Look for closest th up in the dom tree
    const thElement = event.target.closest("th");
    const indexOfCol = thElement.cellIndex;
    console.log("thElement: ", thElement);
    console.log("indexOfCol: ", indexOfCol);

    indexOfCol != -1 ? (index = indexOfCol) : null;
  };

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
        id={`${uuidv4()}_dyn_col_header`}
        size="medium"
        placeholder="Table header"
        addonBefore="Dynamic Table Header"
      />
      <table>
        <thead>
          <tr>
            {tableData.columns.map((col) => (
              <th key={col.id} style={{}}>
                <div
                  className="column-header-indiv-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Input
                    size="middle"
                    placeholder="Header"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <MdAddCircleOutline
                    style={{
                      cursor: "pointer",
                      color: "rgba(122,184,144)",
                    }}
                    size={18}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddColumn(e);
                    }}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell) => {
                const [selectedInputType, setSelectedInputType] =
                  useState(null);
                return (
                  <td key={cell.id}>
                    <div
                      className="cell-container"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div className="input-type">
                        Input type:
                        <Select
                          size="small"
                          placeholder="Input type"
                          options={inputExpected.sort()}
                          style={{ width: "100%" }}
                          onChange={(value) => setSelectedInputType(value)}
                        />
                        <Divider style={{ margin: "6px 0" }} />
                      </div>
                      <DetailsCell selectedInputType={selectedInputType} />
                      <Divider style={{ margin: "6px 0" }} />
                      <Preview selectedInputType={selectedInputType} />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
