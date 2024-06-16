import React, { useCallback, useEffect } from "react";
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
    gridsToBeDropped,
    setGridsToBeDropped,
    gridsOccupied,
    setGridsOccupied,
    setComponentFit,
  } = useFormBuilderContext();

  const handleDragStart = useCallback((event) => {
    setActiveDragComponent(event.active.data.current);
    setDragOccur(true);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveDragComponent(null);
    setDragOccur(false);
  }, []);

  /**
   * Calculates if a component can fit if dropped at a given grid.
   *
   * @param {number} colNeeded - The number of columns needed by the component.
   * @param {number} rowNeeded - The number of rows needed by the component.
   * @param {number[][]} gridsOccupied - The grid occupied by other components.
   * @param {number} dropRow - The row where the component is being dropped.
   * @param {number} dropCol - The column where the component is being dropped.
   * @return {boolean, number[][]} True if the component can fit, false otherwise and an array of involved grids.
   */
  const calcComponentFit = (
    colNeeded,
    rowNeeded,
    gridsOccupied,
    dropRow,
    dropCol
  ) => {
    let fit = true,
      gridsInvolved = {};
    for (let i = dropRow; i < dropRow + rowNeeded; i++) {
      const rowDownwardArray = gridsOccupied[i].slice(
        dropCol,
        dropCol + colNeeded || null
      );
      gridsInvolved[i] = rowDownwardArray;

      console.log("rowDownwardArray: ", rowDownwardArray);

      if (rowDownwardArray.includes(1) || rowDownwardArray.length < colNeeded) {
        fit = false;
      }
    }
    return [fit, gridsInvolved];
  };

  const handleDragOver = useCallback(({ over, active }) => {
    if (!over) return;
    console.log("IN OVER HANDLE", "over: ", over, "active: ", active);

    const colNeeded = active.data.current.gridsCol,
      rowNeeded = active.data.current.gridsRow,
      dropRow = over.data.current.dropRow,
      dropCol = over.data.current.dropCol;

    const [componentFit, gridsInvolved] = calcComponentFit(
      colNeeded,
      rowNeeded,
      gridsOccupied,
      dropRow,
      dropCol
    );

    setComponentFit(componentFit);

    setGridsToBeDropped(() => {
      console.log("gridsInvolved: ", gridsInvolved);
      const newGridsInvolved = [];

      for (const [key, value] of Object.entries(gridsInvolved)) {
        for (let i = 0; i < value.length; i++) {
          const inferredCol = 4 - value.length + i;
          if (value[i] !== 1) {
            const grid = `${inferredCol}-${key}`;
            newGridsInvolved.push(grid);
          }
        }
      }

      console.log([...newGridsInvolved]);

      return [...newGridsInvolved];
    });
  });

  const handleDragEnd = ({ active, over }) => {
    setDragOccur(false);
    setComponentFit(false);
    setGridsToBeDropped([]);
    console.log("IN END HANDLE", "over: ", over, "active: ", active);

    //commit to local storage and context if the draggable is over a droppable
    if (!over) return;
    if (!over.data.current.availability) return;

    //calculation of whether components can be dropped
    const colNeeded = active.data.current.gridsCol,
      rowNeeded = active.data.current.gridsRow,
      dropRow = over.data.current.dropRow,
      dropCol = over.data.current.dropCol;

    const [componentFit, gridsInvolved] = calcComponentFit(
      colNeeded,
      rowNeeded,
      gridsOccupied,
      dropRow,
      dropCol
    );
    console.log(componentFit);

    if (!componentFit) return;

    const committedItem = {
      ...active.data.current,
      top: `${over.data.current.dropRow * 8.5}%`,
      left: `${over.data.current.dropCol * 25}%`,
    };

    // console.log(committedItem);
    setCommittedComponents((prev) => {
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
