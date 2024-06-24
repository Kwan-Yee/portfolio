import { useDroppable } from "@dnd-kit/core";
import React from "react";

import { useFormBuilderContext } from "../../context-provider";
import SectionItem from "./form-builder-canvas-section-item";

function SectionRenderer() {
  const { sections, setSections } = useFormBuilderContext();

  const localStorageSections = JSON.parse(localStorage.getItem("sections"));

  if (!localStorageSections) {
    localStorage.setItem("sections", JSON.stringify(sections));
  }

  sections.forEach((id) => {
    if (!localStorage.getItem(id))
      localStorage.setItem(id, JSON.stringify({ title: "", children: [] }));
  });

  return (
    <div
      className="section-canvas"
      style={{
        flex: 12.5,
        minHeight: "100%",
        maxHeight: "max-content",
      }}
    >
      <div
        className="sections-container"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {sections.map((section, index) => (
          <SectionItem key={section} index={index} sectionId={section} />
        ))}
      </div>
    </div>
  );
}

export default SectionRenderer;
