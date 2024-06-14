import React, { useContext, createContext, useState } from "react";

const FormBuilderContext = createContext();

export function FormBuilderProvider({ children }) {
  const [activeDragComponent, setActiveDragComponent] = useState(null);
  const [committedComponents, setCommittedComponents] = useState(
    localStorage.getItem("committedComponents")
      ? JSON.parse(localStorage.getItem("committedComponents"))
      : []
  );
  const [overGrid, setOverGrid] = useState({ col: null, row: null });
  const [activeGrid, setActiveGrid] = useState([]);
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
        overGrid,
        setOverGrid,
        activeGrid,
        setActiveGrid,
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
