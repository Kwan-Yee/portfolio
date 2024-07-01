import React, { useEffect, useRef } from "react";
import { useHover } from "@uidotdev/usehooks";
import { useDraggable } from "@dnd-kit/core";

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
}

function SidebarComponentItem({ component }) {
  // const [ref, hovering] = useHover();
  // const { attributes, listeners, setNodeRef, transform, isDragging } =
  //   useDraggable({
  //     id: `drag-components-sidebar-${component.name}`,
  //     data: { component },
  //   });

  // Merge hoverRef and draggableRef
  // const combinedRef = mergeRefs(ref, setNodeRef);

  // const customTransform = { ...transform, scaleX: 1, scaleY: 1 };

  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="draggable-sidebar-component-container"
      // ref={combinedRef}
      // {...attributes}
      // {...listeners}
      style={{
        flexBasis: "60px",
        height: "100%",
        border: hovering
          ? "1px solid rgba(0, 0, 0, 0.3)"
          : "1px solid transparent",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "5px",
        padding: "4px",
        cursor: "grab",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "row",
        transform: customTransform,
      }}
    >
      <div
        className="small-colored-ribbon"
        style={{
          flexBasis: "3px",
          marginRight: "6px",
          backgroundColor: "#a1c4ac",
          borderRadius: "3px",
        }}
      ></div>
      <div
        className="component-name"
        style={{ display: "flex", alignItems: "center" }}
      >
        {component.name
          .split("-")
          .map((word) => capitalise(word))
          .join(" ")}
      </div>
    </div>
  );
}

export default SidebarComponentItem;
