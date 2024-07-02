import React from "react";
import { useDroppable } from "@dnd-kit/core";

import { useFormBuilderContext } from "../../../context-provider";

function DroppableSectionArea({ sectionId }) {
  const { activeDragComponent } = useFormBuilderContext();
  // const { setNodeRef } = useDroppable({
  //   id: `section-droppable-area-${sectionId}`,
  // });
  return (
    <div
      // ref={setNodeRef}
      className="section-content-droppable"
      style={{
        height: "46px",
        border: activeDragComponent
          ? "1px dashed rgba(0, 0, 0, 0.8)"
          : "1px dashed rgba(0, 0, 0, 0.3)",
        backgroundColor: activeDragComponent
          ? "rgba(0, 0, 0, 0.1)"
          : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontStyle: "italic",
        color: activeDragComponent
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(0, 0, 0, 0.3)",
      }}
    >
      Drop a component here
    </div>
  );
}

export default DroppableSectionArea;
