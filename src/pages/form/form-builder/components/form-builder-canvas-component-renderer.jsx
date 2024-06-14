import { useDroppable } from "@dnd-kit/core";
import React from "react";

import { useFormBuilderContext } from "../../context-provider";
import GridItem from "./form-builder-canvas-grid-item";

function ComponentRenderer() {
  const numberOfColumn = [1, 2, 3, 4];
  const numberOfRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log(numberOfColumn);

  const { committedComponents, setCommittedComponents } =
    useFormBuilderContext();

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
        {numberOfRows.map((row) => (
          <div
            key={row}
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
            {numberOfColumn.map((col) => (
              <GridItem key={`${col}-${row}`} col={col} row={row} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentRenderer;
