import React, { useState } from "react";
import { Divider, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { MdAddCircleOutline } from "react-icons/md";

import DetailsCell from "./details";
import Preview from "./preview";

function DynamicTable() {
  const [tableData, setTableData] = useState({
    columns: [{ id: "col-1" }, { id: "col-2" }],
    rows: [
      { id: "r1", cells: [{ id: "r1-1" }, { id: "r1-2" }] },
      { id: "r2", cells: [{ id: "r2-1" }, { id: "r2-2" }] },
      { id: "r3", cells: [{ id: "r3-1" }, { id: "r3-2" }] },
    ],
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
    "col-1": null,
    "col-2": null,
  });

  //TODO: initialise the states of input with LS data so it persists across refresh and accidental rerender
  //TODO: the addition of columns    will be to add column and row cell

  const handleAddColumn = (event) => {
    // Look for closest th up in the dom tree
    console.log("curr column length: ", tableData.columns.length);
    if (tableData.columns.length >= 10) return;

    const thElement = event.target.closest("th");
    const indexOfCol = thElement.cellIndex;
    // console.log("thElement: ", thElement);
    // console.log("indexOfCol: ", indexOfCol);

    setTableData((prev) => {
      if (prev.columns.length >= 16) return prev;
      console.log("prev column: ", prev);
      const newColumns = { ...prev }.columns;
      const rows = { ...prev }.rows;
      console.log("rows: ", rows);
      newColumns.splice(indexOfCol + 1, 0, {
        id: `col-${newColumns.length + 1}`,
      });
      const newRows = rows.map((row, idx) => {
        row.cells.splice(indexOfCol + 1, 0, {
          id: `r${idx}-${row.cells.length + 1}`,
        });
        return row;
      });
      const newData = {
        ...prev,
        columns: newColumns,
        rows: newRows,
      };

      console.log("newData: ", newData);
      return newData;
    });
  };

  return (
    <div
      className="dynamic-table-container"
      style={{
        flexBasis: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "4px",
        overflowX: "auto",
      }}
    >
      <Input
        id={`${uuidv4()}_dyn_col_header`}
        size="medium"
        placeholder="Table header"
        addonBefore="Dynamic Table Header"
      />
      <div
        className="table-container"
        style={{ overflowX: "auto", boxSizing: "border-box" }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              {tableData.columns.map((col) => (
                <th key={col.id} style={{ minWidth: "150px" }}>
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
            <tr key={tableData.rows[0].id}>
              {tableData.rows[0].cells.map((cell) => {
                return (
                  <td key={cell.id}>
                    <div
                      className="input-type"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <Select
                        size="small"
                        placeholder="Input"
                        options={inputExpected.sort()}
                        style={{ maxWidth: "100%" }}
                        onChange={(value) =>
                          setSelectedInputType((prev) => {
                            return {
                              ...prev,
                              [`col-${cell.id.match(/-(.*)/)}`]: value,
                            };
                          })
                        }
                      />
                      <Divider style={{ margin: "6px 0" }} />
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr key={tableData.rows[1].id}>
              {tableData.rows[1].cells.map((cell) => (
                <td key={cell.id}>
                  <DetailsCell
                    selectedInputType={selectedInputType}
                    cellId={`col-${cell.id.match(/-(.*)/)}`}
                  />
                </td>
              ))}
            </tr>
            <tr key={tableData.rows[2].id}>
              {tableData.rows[2].cells.map((cell) => (
                <td key={cell.id}>
                  <Divider style={{ margin: "6px 0" }} />
                  <Preview
                    selectedInputType={selectedInputType}
                    cellId={`col-${cell.id.match(/-(.*)/)}`}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicTable;
