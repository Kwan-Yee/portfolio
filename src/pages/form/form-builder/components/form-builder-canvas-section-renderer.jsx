import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import React, { useRef, useState } from "react";

import { useFormBuilderContext } from "../../context-provider";
import SortableSectionItem from "./form-builder-canvas-section-item";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import InlineSectionAdder from "./form-builder-canvas-section-adder";
import SortableComponentIndex from "../form-components/sortable-component-index";

function SectionRenderer() {
  const { sections, setSections, activeDragComponent, setActiveDragComponent } =
    useFormBuilderContext();

  const sectionRefs = useRef([]);

  const localStorageSections = JSON.parse(localStorage.getItem("sections"));

  if (!localStorageSections) {
    localStorage.setItem("sections", JSON.stringify(sections));
  }

  sections.forEach((id) => {
    if (!localStorage.getItem(id))
      localStorage.setItem(
        id,
        JSON.stringify({ title: "", children: [], id: id })
      );
  });

  const handleDragStart = ({ active }) => {
    console.log("active: ", active);
    setActiveDragComponent(active);
    // setDragIndex(event.active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    console.log("active: ", active);
    console.log("over: ", over);
    if (!over) return;
    if (active.id !== over.id) {
      console.log("triggered");
      const indexOfCurrSection = sections.indexOf(active.data.current.parent);
      console.log(sectionRefs.current, indexOfCurrSection);
      sectionRefs.current[indexOfCurrSection].setCompsToRender((prevState) => {
        // console.log("prevState: ", prevState);
        const activeIndex = prevState.findIndex((i) => i.id === active?.id);
        // console.log("activeIndex:", activeIndex);
        const overIndex = prevState.findIndex((i) => i.id === over?.id);
        // console.log("overIndex:", overIndex);

        const oldData = JSON.parse(
          localStorage.getItem(active.data.current.parent)
        );

        oldData.children = arrayMove(oldData.children, activeIndex, overIndex);

        localStorage.setItem(
          active.data.current.parent,
          JSON.stringify(oldData)
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  //FIXME: Sortable sections cannot drag

  return (
    <div
      className="section-canvas"
      style={{
        flex: 12.5,
        minHeight: "100%",
        maxHeight: "max-content",
      }}
    >
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="sections-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {sections.map((section, index) => (
            <div className="section-parent-container-with-adder" key={section}>
              <SortableSectionItem
                index={index}
                sectionId={section}
                ref={(el) => (sectionRefs.current[index] = el)}
              />
              <InlineSectionAdder index={index} />
            </div>
          ))}
        </div>
        <DragOverlay>
          {/* xxxx */}
          <SortableComponentIndex
            type={activeDragComponent?.data.current.type}
          />
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default SectionRenderer;
