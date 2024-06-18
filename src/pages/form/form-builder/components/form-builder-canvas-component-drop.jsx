import React from "react";
import styled from "styled-components";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import { useFormBuilderContext } from "../../context-provider";
import GridItem from "./form-builder-canvas-grid-item";
import DynamicRenderer from "../form-components/index";
import { useHover } from "@uidotdev/usehooks";

const PageAdder = styled.div`
  flex: 1;
  height: 100%;
  justify-content: center;
  border-radius: 8px;
  margin-top: 2px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageRemover = styled.div`
  flex: 1;
  height: 100%;
  justify-content: center;
  border-radius: 8px;
  margin-top: 2px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ComponentRenderer({
  committedComponents,
  formPageNum,
  gridsOccupied,
  gridsToBeDropped,
}) {
  const { formPage, setFormPage } = useFormBuilderContext();

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
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    committedComponents: [],
  };

  const [addRef, addHovering] = useHover();
  const [deleteRef, deleteHovering] = useHover();

  const handleAddPage = (pageIndex) => {
    if (formPage.length >= 12) return;
    setFormPage((prev) => {
      console.log("prev: ", prev);
      // copying for best practice
      const newPages = [...prev];

      // add page with splicing
      newPages.splice(pageIndex + 1, 0, newFormPage);
      console.log("newPages: ", newPages);
      return newPages;
    });
  };
  const handleRemovePage = (pageIndex) => {
    if (formPage.length <= 1) return;
    setFormPage((prev) => {
      console.log(prev);
      // copying for best practice
      const newPages = [...prev];

      // add page with splicing
      newPages.splice(pageIndex, 1);
      return newPages;
    });
  };
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
            height: `calc(${component.gridsRow * 5.875}% - 2px)`,
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
              flexBasis: "5.875%",
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
        {/* TODO: add and delete from specific index, currently it's adding to the end by default */}
        {/* TODO: add delete buttons */}
        <div
          style={{
            width: "100%",
            height: "6%",
            justifyContent: "center",
            borderRadius: "8px",
            marginTop: "2px",
            flexShrink: 0,
            boxSizing: "border-box",
            display: "flex",
            gap: "4px",
          }}
        >
          {formPage.length > 1 ? (
            <>
              <PageAdder
                className="row-adder"
                ref={addRef}
                style={{
                  backgroundColor: addHovering ? "#e6e6e6" : "transparent",
                  border: addHovering
                    ? "2px dashed rgba(0,0,0,0.6)"
                    : "2px dashed rgba(0,0,0,0.3)",
                  cursor: "pointer",
                }}
                onClick={() => handleAddPage(formPageNum)}
              >
                <IoAddCircleOutline
                  style={{
                    fontSize: "32px",
                    color: addHovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                  }}
                />
              </PageAdder>
              <PageRemover
                ref={deleteRef}
                style={{
                  cursor: "pointer",
                  backgroundColor: deleteHovering
                    ? "rgba(237,93, 83, 0.3)"
                    : "transparent",
                  border: deleteHovering
                    ? "2px dashed rgba(237,93, 83, 0.9)"
                    : "2px dashed rgba(237,93, 83, 0.4)",
                }}
                onClick={() => handleRemovePage(formPageNum)}
              >
                <MdDeleteOutline
                  style={{
                    fontSize: "31px",
                    color: deleteHovering
                      ? "rgba(237,93, 83, 1)"
                      : "rgba(237,93, 83, 0.4)",
                  }}
                />
              </PageRemover>
            </>
          ) : (
            <PageAdder
              className="row-adder"
              ref={addRef}
              style={{
                backgroundColor: addHovering ? "#e6e6e6" : "transparent",
                border: addHovering
                  ? "2px dashed rgba(0,0,0,0.6)"
                  : "2px dashed rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              onClick={() => handleAddPage(formPageNum)}
            >
              <IoAddCircleOutline
                style={{
                  fontSize: "32px",
                  color: addHovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                }}
              />
            </PageAdder>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComponentRenderer;
