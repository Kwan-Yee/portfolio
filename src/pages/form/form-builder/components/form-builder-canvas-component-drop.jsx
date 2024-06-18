import React from "react";
import styled from "styled-components";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";

import { useFormBuilderContext } from "../../context-provider";
import GridItem from "./form-builder-canvas-grid-item";
import DynamicRenderer from "../form-components/index";
import { useHover } from "@uidotdev/usehooks";

const RowAdder = styled.div`
  display: flex;
  width: 100%;
  height: 6%;
  justify-content: center;
  border-radius: 8px;
  margin-top: 2px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteComponent = styled.div`
  flex-basis: 8px;
`;

function ComponentRenderer({
  committedComponents,
  formPageNum,
  gridsOccupied,
  gridsToBeDropped,
}) {
  const { setFormPage } = useFormBuilderContext();

  const newFormPage = {
    gridsToBeDropped: [],
    gridsOccupied: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    committedComponents: [],
  };

  const [ref, hovering] = useHover();

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
          className="component-container"
          key={`component.name-${component.top}-${component.left}`}
          style={{
            position: "absolute",
            top: component.top,
            left: component.left,
            width: `${component.gridsCol * 25}%`,
            height: `calc(${component.gridsRow * 8.5}% - 2px)`,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DynamicRenderer component={component} />
        </div>
      ))}
      <div
        className="dropzone-grid-system"
        style={{
          height: "100%",
          // maxHeight: "max-content",
          // position: "relative",
          display: "flex",
          flexDirection: "column",
          // boxSizing: "border-box",
          // gap: "4px",
        }}
      >
        {gridsOccupied.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row-container"
            style={{
              flexBasis: "8.5%",
              display: "flex",
              flexShrink: 0,
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
                formPageNum={formPageNum}
                gridsToBeDropped={gridsToBeDropped}
              />
            ))}
          </div>
        ))}
        <RowAdder
          className="row-adder"
          ref={ref}
          style={{
            backgroundColor: hovering ? "#e6e6e6" : "transparent",
            border: hovering
              ? "2px dashed rgba(0,0,0,0.6)"
              : "2px dashed rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
          onClick={() => setFormPage((prev) => [...prev, newFormPage])}
        >
          <IoAddCircleOutline
            style={{
              fontSize: "32px",
              color: hovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
            }}
          />
        </RowAdder>
      </div>
    </div>
  );
}

export default ComponentRenderer;
