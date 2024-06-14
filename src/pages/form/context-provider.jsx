import React, { useContext, createContext, useState } from "react";

const FormBuilderContext = createContext();

export function FormBuilderProvider({ children }) {
  const [activeDragComponent, setActiveDragComponent] = useState(null);
  const [committedComponents, setCommittedComponents] = useState(
    localStorage.getItem("committedComponents")
      ? JSON.parse(localStorage.getItem("committedComponents"))
      : []
  );
  // const [overGrid, setOverGrid] = useState({ col: null, row: null });
  const [activeGrids, setActiveGrids] = useState([]);
  const [gridsOccupied, setGridsOccupied] = useState(
    localStorage.getItem("gridsOccupied")
      ? JSON.parse(localStorage.getItem("gridsOccupied"))
      : [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]
  );
  const [dragOccur, setDragOccur] = useState(false);

  return (
    <FormBuilderContext.Provider
      value={{
        activeDragComponent,
        setActiveDragComponent,
        committedComponents,
        setCommittedComponents,
        dragOccur,
        setDragOccur,
        activeGrids,
        setActiveGrids,
        gridsOccupied,
        setGridsOccupied,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}

/**
 *
 * @returns A custom FORM hook that provides access to the {context, mutator methods}
 */
export const useFormBuilderContext = () => useContext(FormBuilderContext);
