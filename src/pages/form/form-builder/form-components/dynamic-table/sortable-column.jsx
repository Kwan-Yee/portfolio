import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableColumn({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <th
      // onClick={(e) => console.log("clicked")}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => console.log("clicked")}
    >
      {children}
    </th>
  );
}

export default SortableColumn;
