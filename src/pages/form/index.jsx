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
    setActiveGrids,
    setGridsOccupied,
  } = useFormBuilderContext();

  const handleDragStart = useCallback((event) => {
    setActiveDragComponent(event.active.data.current);
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

    //calculation of whether components can be dropped
    const colNeeded = active.data.current.gridsCol;
    // const colRightwardAvailable = 4 - over.data.current.dropCol;
    // const rowDownwardAvailable = 4 - over.data.current.dropRow;
  }, []);

  const handleDragEnd = ({ active, over }) => {
    setDragOccur(false);
    console.log("IN END HANDLE", "over: ", over, "active: ", active);

    //commit to local storage and context if the draggable is over a droppable
    if (!over) return;
    if (!over.data.current.availability) return;

    const committedItem = {
      ...active.data.current,
      top: `${over.data.current.dropRow * 8.5}%`,
      left: `${over.data.current.dropCol * 25}%`,
    };

    // console.log(committedItem);
    setCommittedComponents((prev) => {
      // console.log("prev: ", prev);

      // console.log("updated: ", [...prev, committedItem]);

      localStorage.setItem(
        "committedComponents",
        JSON.stringify([...prev, committedItem])
      );
      return [...prev, committedItem];
    });

    setGridsOccupied((prev) => {
      const indexOfRow = over.data.current.dropRow;
      const indexOfCol = over.data.current.dropCol;

      const newGridsOccupied = [...prev];
      newGridsOccupied[indexOfRow][indexOfCol] = 1;

      localStorage.setItem("gridsOccupied", JSON.stringify(newGridsOccupied));

      return newGridsOccupied;
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
