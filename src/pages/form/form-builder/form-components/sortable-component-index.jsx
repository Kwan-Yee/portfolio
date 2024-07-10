import React from "react";
import { MdOutlineDragIndicator, MdClose } from "react-icons/md";
import ComponentsIndex from "../form-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableComponentIndex({ type, id, index, parent }) {
  // console.log("id: ", id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: { type: type, parent: parent },
    });

  const handleRemoveComp = () => {
    console.log("triggered");
  };
  return (
    <div
      className="section-component-container"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        transform: CSS.Transform.toString({
          ...transform,
          scaleX: 1,
          scaleY: 1,
          translate3d: "0px, 0px, 0px",
        }),
        transition,
        alignItems: "center",
      }}
      ref={setNodeRef}
    >
      <ComponentsIndex key={id} type={type} />
      <div
        className="close-and-drag"
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        <MdClose style={{ cursor: "pointer" }} onClick={handleRemoveComp} />
        <MdOutlineDragIndicator
          {...attributes}
          {...listeners}
          style={{ cursor: "move" }}
        />
      </div>
    </div>
  );
}

export default SortableComponentIndex;
