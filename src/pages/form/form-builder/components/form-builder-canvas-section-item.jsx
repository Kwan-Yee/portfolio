import React from "react";
import {
  MdOutlineExpandMore,
  MdOutlineDelete,
  MdFileCopy,
} from "react-icons/md";
import { FiMove } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { Divider, Input } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { useHover } from "@uidotdev/usehooks";

import { useFormBuilderContext } from "../../context-provider";
import DroppableSectionArea from "./form-builder-canvas-section-item-drop";

function SectionItem({ sectionId, index }) {
  console.log("sectionId: ", sectionId);
  const [isRotate, setIsRotate] = React.useState(true);
  const { sections, setSections, activeDragComponent } =
    useFormBuilderContext();
  // const [ref, hovering] = useHover();

  const { attributes, listeners, setNodeRef } = useSortable({ id: sectionId });

  const handleSectionDelete = () => {
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

  const handleSectionCopy = () => {
    console.log("sectionId to copy: ", sectionId);

    //copying section
    const copiedSection = JSON.parse(localStorage.getItem(sectionId));

    // update copied section Id
    const updatedCopy = { ...copiedSection, id: `${uuidv4()}_Section` };

    //look for the index of the section
    const idx = sections.findIndex((id) => id === sectionId);

    //splice the updatedCopy into section and save to both local storage and context
    setSections((prev) => {
      const newSections = [...prev];
      // console.log(newSections);

      newSections.splice(idx + 1, 0, updatedCopy.id);
      localStorage.setItem("sections", JSON.stringify(newSections));
      localStorage.setItem(updatedCopy.id, JSON.stringify(updatedCopy));

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
      ref={setNodeRef}
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
        <Input size="small" maxLength={200} allowClear />
        <MdFileCopy
          style={{ cursor: "pointer", fontSize: "14px" }}
          onClick={handleSectionCopy}
        />
        <MdOutlineDelete
          // ref={ref}
          style={{
            cursor: "pointer",
            // color: hovering ? "red" : "none", TODO: to forward ref
          }}
          onClick={handleSectionDelete}
        />
        <Divider type="vertical" style={{ margin: "0px 4px" }} />
        <FiMove style={{ cursor: "move" }} {...attributes} {...listeners} />
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
          <div className="section-content-render-container">
            Area for component to render
          </div>
          <DroppableSectionArea sectionId={sectionId} />
        </div>
      )}
    </div>
  );
}

export default SectionItem;
