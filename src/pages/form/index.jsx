import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";

import NavLayout from "./nav-layout";
import { useFormBuilderContext } from "./context-provider";
import SidebarComponentItem from "./form-builder/components/sidebar-components-item";

function FormLanding() {
  const {
    activeDragComponent,
    setActiveDragComponent,
    setCommittedComponents,
    setDragOccur,
    setGridsToBeDropped,
    setGridsOccupied,
    setComponentFit,
    formPage,
  } = useFormBuilderContext();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragStart = useCallback((event) => {
    // console.log("triggered");
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
      const rowDownwardArray = gridsOccupied[i]?.slice(
        dropCol,
        dropCol + colNeeded || null
      );
      gridsInvolved[i] = rowDownwardArray;

      console.log("rowDownwardArray: ", rowDownwardArray);

      if (
        rowDownwardArray?.includes(1) ||
        rowDownwardArray?.length < colNeeded ||
        !rowDownwardArray
      ) {
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
      formPage[over.data.current.parentPageIndex].gridsOccupied,
      dropRow,
      dropCol
    );

    setComponentFit(componentFit);
    setGridsToBeDropped(gridsInvolved, over.data.current.parentPageIndex);
  });

  const handleDragEnd = ({ active, over }) => {
    setDragOccur(false);
    setComponentFit(false);

    console.log("IN END HANDLE", "over: ", over, "active: ", active);

    //commit to local storage and context if the draggable is over a droppable
    if (!over) return;
    if (!over.data.current.availability) return;

    setGridsToBeDropped([], over.data.current.parentPageIndex);

    //calculation of whether components can be dropped
    const colNeeded = active.data.current.gridsCol,
      rowNeeded = active.data.current.gridsRow,
      dropRow = over.data.current.dropRow,
      dropCol = over.data.current.dropCol;

    const [componentFit, gridsInvolved] = calcComponentFit(
      colNeeded,
      rowNeeded,
      formPage[over.data.current.parentPageIndex].gridsOccupied,
      dropRow,
      dropCol
    );
    console.log(componentFit);

    if (!componentFit) return;

    const committedItem = {
      ...active.data.current,
      top: `calc(${over.data.current.dropRow * 5.875}% + 1px)`,
      left: `${over.data.current.dropCol * 25}%`,
    };

    // console.log(committedItem);
    setCommittedComponents(
      committedItem,
      over.data.current.parentPageIndex,
      "add"
    );

    setGridsOccupied(
      over.data.current.dropCol,
      over.data.current.dropRow,
      active.data.current.gridsCol,
      active.data.current.gridsRow,
      over.data.current.parentPageIndex,
      "add"
    );
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
          // sensors={sensors}
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
