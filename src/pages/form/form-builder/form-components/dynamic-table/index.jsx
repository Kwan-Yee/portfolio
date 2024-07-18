import React, { useState } from "react";
import { Divider, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { MdAddCircleOutline } from "react-icons/md";

import DetailsCell from "./details";
import Preview from "./preview";

function DynamicTable() {
  const [tableData, setTableData] = useState({
    columns: [{ id: 1 }, { id: 2 }],
    rows: [{ id: "r1", cells: [{ id: 1 }, { id: 2 }] }],
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

  const [selectedInputType, setSelectedInputType] = useState({
    1: null,
    2: null,
  });

  //TODO: initialise the states of input with LS data so it persists across refresh and accidental rerender
  //TODO: the addition of columns will be to add column and row cell

  const handleAddColumn = (event) => {
    // Look for closest th up in the dom tree
    const thElement = event.target.closest("th");
    const indexOfCol = thElement.cellIndex;
    // console.log("thElement: ", thElement);
    // console.log("indexOfCol: ", indexOfCol);

    setTableData((prev) => {
      if (prev.columns.length >= 16) return prev;
      console.log("prev column: ", prev);
      const newColumns = { ...prev }.columns;
      const newCells = { ...prev }.rows[0].cells;
      newColumns.splice(indexOfCol + 1, 0, { id: newColumns.length + 1 });
      newCells.splice(indexOfCol + 1, 0, { id: newCells.length + 1 });
      const newData = {
        ...prev,
        columns: newColumns,
        rows: [{ id: "r1", cells: newCells }],
      };

      console.log("newData: ", newData);
      return newData;
    });
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
                        <Select
                          size="small"
                          placeholder="Input"
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
