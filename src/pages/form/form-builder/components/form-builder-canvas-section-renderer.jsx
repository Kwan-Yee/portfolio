import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import React, { useState } from "react";

import { useFormBuilderContext } from "../../context-provider";
import SortableSectionItem from "./form-builder-canvas-section-item";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import InlineSectionAdder from "./form-builder-canvas-section-adder";

function SectionRenderer() {
  const { sections, setSections, activeDragComponent, setActiveDragComponent } =
    useFormBuilderContext();

  const [dragIndex, setDragIndex] = useState(null);

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

  // const handleDragOver = ({ active, over }) => {
  //   const activeIndex = columns.findIndex((i) => i.key === active.id);
  //   const overIndex = columns.findIndex((i) => i.key === over?.id);
  // setDragIndex({
  //   active: active.id,
  //   over: over?.id,
  //   direction: overIndex > activeIndex ? "right" : "left",
  // });
  // };

  const handleDragEnd = ({ active, over }) => {
    console.log("active: ", active);
    console.log("over: ", over);
    if (active.id !== over?.id) {
      // console.log("triggered");
      setSections((prevState) => {
        const activeIndex = prevState.findIndex((i) => i === active?.id);
        console.log("activeIndex:", activeIndex);
        const overIndex = prevState.findIndex((i) => i === over?.id);
        console.log("overIndex:", overIndex);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
    // setDragIndex({ active: -1, over: -1 });
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
        // onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="sections-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section, index) => (
              <>
                <SortableSectionItem
                  key={section}
                  index={index}
                  sectionId={section}
                />
                <InlineSectionAdder index={index} />
              </>
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {/* TODO: pass the dragged section id onto this item */}
          <SortableSectionItem index={1} sectionId={activeDragComponent?.id} />
          {/* XXXXXXX */}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default SectionRenderer;
