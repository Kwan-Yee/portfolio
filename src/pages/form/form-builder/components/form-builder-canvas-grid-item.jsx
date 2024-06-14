import React from "react";
import { useDroppable } from "@dnd-kit/core";

import { useFormBuilderContext } from "../../context-provider";

function GridItem({ col, row, availability }) {
  const { dragOccur, activeGrid } = useFormBuilderContext();

  const { setNodeRef, isOver } = useDroppable({
    id: `dropzone-grid-${col}-${row}`,
    data: {
      dropCol: col,
      dropRow: row,
      availability: availability,
    },
  });

  return (
    <div
      className="individual-grid"
      ref={setNodeRef}
      style={{
        height: "100%",
        maxWidth: "25%",
        flex: 1,
        borderRadius: "4px",
        backgroundColor: dragOccur ? "rgba(0,0,0,0.1)" : "transparent",
        transition: "background-color 0.3s ease-in-out",
        boxSizing: "border-box",
      }}
    />
  );
}

export default GridItem;
