import React, { useState } from "react";
import { Table, Input } from "antd";
import { MdAddCircleOutline } from "react-icons/md";

function StaticTable({ compId }) {
  // const [dragIndex, setDragIndex] = useState({ active: -1, over: -1 });
  const [tableData, setTableData] = useState({
    columns: [{ id: 1 }, { id: 2 }],
    rows: [{ id: "r1", cells: [{ id: 1 }, { id: 2 }] }],
  });

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
        size="medium"
        placeholder="Table header"
        addonBefore="Static Table Header"
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
                    <div className="static-table-cell">
                      <Input
                        size="small"
                        placeholder="Cell"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
