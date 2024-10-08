import React from "react";
import { MdOutlineDragIndicator, MdClose } from "react-icons/md";
import ComponentsIndex from "../form-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableComponentIndex({ type, id, index, parent, setCompsToRender }) {
  // console.log("id: ", id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: { type: type, parent: parent },
    });

  const handleRemoveComp = (index) => {
    console.log("compIndex: ", index);
    setCompsToRender((prevState) => {
      const newState = [...prevState];
      // console.log("newstate: ", newState);
      const idRemoved = newState.splice(index, 1);
      console.log("idRemoved: ", idRemoved[0]);

      const section = JSON.parse(localStorage.getItem(parent));
      section.children = newState;

      localStorage.setItem(parent, JSON.stringify(section));
      localStorage.removeItem(idRemoved[0].id);
      return newState;
    });
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
        // maxWidth: "100%",
      }}
      ref={setNodeRef}
    >
      <ComponentsIndex key={index} type={type} compId={id} />
      <div
        className="close-and-drag"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          flexBasis: "18px",
        }}
      >
        <MdClose
          style={{ cursor: "pointer" }}
          onClick={() => handleRemoveComp(index)}
        />
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
