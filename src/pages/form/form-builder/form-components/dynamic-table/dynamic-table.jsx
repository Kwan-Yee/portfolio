import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  // KeyboardSensor,
  closestCenter,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  // sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React from "react";

import SortableColumn from "./sortable-column";
import { useFormBuilderContext } from "../../../context-provider";

export function DynamicTable() {
  //TODO: context and local storage of columns and rows
  const { columns, setColumns } = useFormBuilderContext();

  const rows = [
    { id: 1, data: ["John", 25, "New York"] },
    { id: 2, data: ["Jane", 30, "London"] },
    { id: 3, data: ["Bob", 40, "Paris"] },
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

  const sensors = useSensors(useSensor(MouseSensor));

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
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={() => console.log("drag start")}
      >
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <SortableColumn key={column.id} id={column.id}>
                    {column.title}
                  </SortableColumn>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column, index) => (
                    <td key={column.id}>{row.data[index]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DynamicTable;
