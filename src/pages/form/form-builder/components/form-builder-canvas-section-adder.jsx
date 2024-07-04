import React from "react";
import { useHover } from "@uidotdev/usehooks";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import { useFormBuilderContext } from "../../context-provider";
function InlineSectionAdder({ index }) {
  const [ref, hovering] = useHover();
  const { setSections } = useFormBuilderContext();

  const handleSectionAdder = () => {
    console.log("clicked +");
    const newSectionId = `${uuidv4()}_Section`;
    setSections((prev) => {
      console.log("prev: ", prev);
      console.log("index: ", index);
      console.log("newSectionId: ", newSectionId);
      const newSections = [...prev];
      newSections.splice(index + 1, 0, newSectionId);
      localStorage.setItem("sections", JSON.stringify(newSections));
      newSections.forEach((id) => {
        if (!localStorage.getItem(id)) {
          localStorage.setItem(
            id,
            JSON.stringify({ title: "", children: [], id: id })
          );
        }
      });
      return newSections;
    });
  };
  return (
    <div
      className="inline-section-adder-container"
      ref={ref}
      style={{
        height: "3px",
        margin: "7.5px 0px",
        backgroundColor: hovering ? "rgba(91, 91, 91, 0.5)" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleSectionAdder}
    >
      <IoMdAdd
        ref={ref}
        style={{
          backgroundColor: "white",
          color: hovering ? "rgba(91, 91, 91, 0.9)" : "transparent",
        }}
      />
    </div>
  );
}

export default InlineSectionAdder;
