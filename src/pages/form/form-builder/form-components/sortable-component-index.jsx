import React from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import ComponentsIndex from "../form-components";
import { useSortable } from "@dnd-kit/sortable";

function SortableComponentIndex({ type, id }) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id,
  });
  return (
    <div
      className="section-component-container"
      style={{ display: "flex", flexDirection: "row", gap: "4px" }}
      ref={setNodeRef}
    >
      <ComponentsIndex key={type} type={type} />
      <MdOutlineDragIndicator
        {...attributes}
        {...listeners}
        style={{ flexBasis: "16px", cursor: "move" }}
      />
    </div>
  );
}

export default SortableComponentIndex;
