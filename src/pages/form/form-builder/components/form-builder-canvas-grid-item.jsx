import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { useFormBuilderContext } from "../../context-provider";

/**
 * Renders a grid item for the form builder canvas.
 *
 * @param {number} col - The column index of the grid item.
 * @param {number} row - The row index of the grid item.
 * @param {boolean} availability - Indicates whether the grid item is available for dropping.
 * @returns {JSX.Element} The grid item component.
 */
function GridItem({ col, row, availability, formPageNum, gridsToBeDropped }) {
  const { dragOccur, componentFit } = useFormBuilderContext();
  // console.log("gridsToBeDropped: ", gridsToBeDropped);

  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-grid-${col}-${row}-page-${formPageNum}`,
    data: {
      dropCol: col,
      dropRow: row,
      availability: availability,
      parentPageIndex: formPageNum,
    },
  });

  const handleGridColor = (
    col,
    row,
    availability,
    gridsToBeDropped,
    dragOccur
  ) => {
    // piece together col-row from params
    const colRowString = `${col}-${row}`;

    if (gridsToBeDropped.includes(colRowString) && dragOccur && !componentFit) {
      return "rgba(237,93, 83, 0.5)";
    } else if (
      gridsToBeDropped.includes(colRowString) &&
      dragOccur &&
      availability &&
      componentFit
    )
      return "rgba(122,184, 144, 0.5)";
    if (dragOccur && availability) return "rgba(0,0,0,0.1)";
    return "transparent";
  };

  return (
    <div
      className="individual-grid"
      ref={setNodeRef}
      style={{
        height: "100%",
        maxWidth: "25%",
        flex: 1,
        borderRadius: "4px",
        backgroundColor: handleGridColor(
          col,
          row,
          availability,
          gridsToBeDropped,
          dragOccur
        ),
        transition: "background-color 0.3s ease-in-out",
        boxSizing: "border-box",
      }}
    />
  );
}

export default GridItem;
