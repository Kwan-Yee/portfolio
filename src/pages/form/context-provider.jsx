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
  const [gridsToBeDropped, setGridsToBeDropped] = useState([]);
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
  const [componentFit, setComponentFit] = useState(false);

  return (
    <FormBuilderContext.Provider
      value={{
        activeDragComponent, // only component structure
        setActiveDragComponent,
        committedComponents,
        setCommittedComponents,
        dragOccur,
        setDragOccur,
        gridsToBeDropped,
        setGridsToBeDropped,
        gridsOccupied,
        setGridsOccupied,
        componentFit,
        setComponentFit,
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
