import { useDroppable } from "@dnd-kit/core";
import React from "react";

import { useFormBuilderContext } from "../../context-provider";
import GridItem from "./form-builder-canvas-grid-item";

const newRow = new Array(4).fill(0);

function ComponentRenderer() {
  const {
    committedComponents,
    setCommittedComponents,
    gridsOccupied,
    setGridsOccupied,
  } = useFormBuilderContext();

  return (
    <div
      className="dropzone-component-container"
      style={{
        height: "100%",
        maxHeight: "max-content",
        position: "relative",
      }}
    >
      {committedComponents.map((component) => (
        <div
          key={`component.name-${component.top}-${component.left}`}
          style={{
            position: "absolute",
            top: component.top,
            left: component.left,
          }}
        >
          {component.name}
        </div>
      ))}
      <div
        className="dropzone-grid-system"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          // gap: "4px",
        }}
      >
        {gridsOccupied.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row-container"
            style={{
              height: "8.5%",
              display: "flex",
              flexDirection: "row",
              boxSizing: "border-box",
              padding: "2px 0px",
              gap: "4px",
            }}
          >
            {row.map((col, colIndex) => (
              <GridItem
                key={`${colIndex}-${rowIndex}`}
                col={colIndex}
                row={rowIndex}
                availability={col === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentRenderer;
