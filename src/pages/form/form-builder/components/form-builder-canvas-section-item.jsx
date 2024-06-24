import React from "react";
import { MdOutlineExpandMore, MdOutlineDelete } from "react-icons/md";
import { Collapse, Input } from "antd";
import { useHover } from "@uidotdev/usehooks";

import { useFormBuilderContext } from "../../context-provider";
import DroppableSectionArea from "./form-builder-canvas-section-item-drop";

function SectionItem({ sectionId, index }) {
  console.log("sectionId: ", sectionId);
  const [isRotate, setIsRotate] = React.useState(true);
  const { sections, setSections, activeDragComponent } =
    useFormBuilderContext();
  // const [ref, hovering] = useHover();

  const handleSectionDelete = (sectionId) => {
    console.log("sectionId to delete: ", sectionId);
    if (sections.length <= 1) return;
    setSections((prev) => {
      const newSections = [...prev];
      const oldSections = newSections.splice(index, 1);
      localStorage.setItem("sections", JSON.stringify(newSections));
      oldSections.forEach((id) => localStorage.removeItem(id));
      return newSections;
    });
  };

  return (
    <div
      className="section"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="section-header"
        style={{
          borderBottom: isRotate ? "1px solid rgba(0, 0, 0, 0.4)" : "none",
          paddingBottom: "8px",
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MdOutlineExpandMore
          style={{
            rotate: isRotate ? "0deg" : "-90deg",
            cursor: "pointer",
          }}
          onClick={() => setIsRotate(!isRotate)}
        />
        <div>{`${index + 1}.`}</div>
        <Input size="small" />
        <MdOutlineDelete
          // ref={ref}
          style={{
            cursor: "pointer",
            // color: hovering ? "red" : "none", TODO: to forward ref
          }}
          onClick={handleSectionDelete}
        />
      </div>
      {isRotate && (
        <div
          className="section-content"
          style={{
            paddingTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          Section Content
          <div className="section-content-render-container">YY</div>
          <DroppableSectionArea sectionId={sectionId} />
        </div>
      )}
    </div>
  );
}

export default SectionItem;
