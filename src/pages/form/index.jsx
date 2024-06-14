import React, { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import NavLayout from "./nav-layout";
import { useFormBuilderContext } from "./context-provider";
import SidebarComponentItem from "./form-builder/components/sidebar-components-item";

function FormLanding() {
  const {
    activeDragComponent,
    setActiveDragComponent,
    setCommittedComponents,
    setDragOccur,
    setOverGrid,
  } = useFormBuilderContext();

  const handleDragStart = useCallback((event) => {
    setActiveDragComponent(event.active.data.current.component);
    setDragOccur(true);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveDragComponent(null);
    setDragOccur(false);
  }, []);

  const handleDragOver = useCallback(({ over, active }) => {
    console.log("IN OVER HANDLE", "over: ", over, "active: ", active);

    // TODO: changes the overGrid state in context
    if (!over) return;

    setOverGrid((prev) => {
      return {
        ...prev,
        col: over.data.current.dropCol,
        row: over.data.current.dropRow,
      };
    });
  }, []);

  const handleDragEnd = ({ active, over }) => {
    setDragOccur(false);
    console.log("IN END HANDLE", "over: ", over, "active: ", active);

    //commit to local storage and context if the draggable is over a droppable
    if (!over) return;
    //TODO: add position to the committed components
    // const committedItem = active.data.current.component;
    const committedItem = {
      ...active.data.current.component,
      top: `${(over.data.current.dropRow - 1) * 8.5}%`,
      left: `${(over.data.current.dropCol - 1) * 25}%`,
    };
    // committedItem.builder.left = `${(over.data.current.dropCol - 1) * 25}%`;

    console.log(committedItem);
    setCommittedComponents((prev) => {
      console.log("prev: ", prev);

      console.log("updated: ", [...prev, committedItem]);

      localStorage.setItem(
        "committedComponents",
        JSON.stringify([...prev, committedItem])
      );
      return [...prev, committedItem];
    });
  };

  return (
    <div
      className="form-page-container"
      style={{
        display: "flex",
        padding: "6px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <NavLayout />

      <div
        className="conditional-builder-or-usage-container"
        style={{ flex: 11, padding: "6px", boxSizing: "border-box" }}
      >
        <DndContext
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        >
          <Outlet />
          <DragOverlay style={{ fontFamily: "Roboto, sans-serif" }}>
            {activeDragComponent && (
              <SidebarComponentItem component={activeDragComponent} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default FormLanding;
