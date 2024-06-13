import { useDroppable } from "@dnd-kit/core";
import React from "react";

function ComponentRendererByRow() {
  const { setNodeRef, isOver } = useDroppable({
    id: "dropzone-component-renderer",
  });
  return (
    <div
      ref={setNodeRef}
      className="dropzone-component-renderer"
      style={{
        height: "100%",
        maxHeight: "max-content",
        border: isOver
          ? "1px dashed rgba(0,0,0,0.3)"
          : "1px dashed transparent",
      }}
    ></div>
  );
}

export default ComponentRendererByRow;
