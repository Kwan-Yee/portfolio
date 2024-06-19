import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  // KeyboardSensor,
  closestCenter,
  MouseSensor,
  // DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import React from "react";

import SortableColumn from "./sortable-column";
import { useFormBuilderContext } from "../../../context-provider";

export function DynamicTable() {
  //TODO: context and local storage of columns and rows
  const { columns, setColumns } = useFormBuilderContext();

  const rows = [
    { name: "John", age: 28, city: "New York" },
    { name: "Jane", age: 34, city: "San Francisco" },
    { name: "Paul", age: 23, city: "Chicago" },
    ,
  ];

  const handleDragEnd = (event) => {
    console.log("triggered");
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((col) => col.id === active.id);
      const newIndex = columns.findIndex((col) => col.id === over.id);
      setColumns((columns) => arrayMove(columns, oldIndex, newIndex));
    }
  };

  // const sensors = useSensors(useSensor(MouseSensor));

  return (
    <div
      className="dynamic-table"
      style={{
        border: "1px solid  #5b5b5b",
        width: "100%",
        height: "99%",
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        // sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={() => console.log("drag start")}
      >
        <table>
          <thead>
            <tr>
              <SortableContext
                items={columns}
                strategy={horizontalListSortingStrategy}
              >
                {columns.map((column) => (
                  <SortableColumn key={column.id} id={column.id}>
                    {column.title}
                  </SortableColumn>
                ))}
              </SortableContext>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.id}>{row[column.id]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <DragOverlay>XXX</DragOverlay> */}
      </DndContext>
    </div>
  );
}

export default DynamicTable;
