import React, { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import NavLayout from "./nav-layout";
import { useFormBuilderContext } from "./context-provider";
import SidebarComponentItem from "./form-builder/components/sidebar-components-item";

function FormLanding() {
  const { activeDragComponent, setActiveDragComponent } =
    useFormBuilderContext();
  const handleDragStart = useCallback((event) => {
    setActiveDragComponent(event.active.data.current.component);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveDragComponent(null);
  }, []);

  const handleDragOver = useCallback(({ over, active }) => {
    console.log("over: ", over, "active: ", active);
  }, []);

  const handleDragEnd = useCallback(({ over, active }) => {
    setActiveDragComponent(null);
  }, []);

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
