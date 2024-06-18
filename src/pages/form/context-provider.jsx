import React, { useContext, createContext, useState } from "react";

const FormBuilderContext = createContext();

export function FormBuilderProvider({ children }) {
  const [activeDragComponent, setActiveDragComponent] = useState(null);
  const setCommittedComponents = (committedItem, index, mode) => {
    if (mode === "add") {
      setFormPage((prev) => {
        const newPages = [...prev];
        newPages[index].committedComponents.push(committedItem);
        console.log("newPages: ", newPages);

        localStorage.setItem("pages", JSON.stringify(newPages));

        return newPages;
      });
    } else if (mode === "delete") {
    }
  };

  const setGridsToBeDropped = (gridsInvolved, index) => {
    const newGridsInvolved = [];
    for (const [key, value] of Object.entries(gridsInvolved)) {
      for (let i = 0; i < value?.length; i++) {
        const inferredCol = 4 - value?.length + i;
        if (value[i] !== 1) {
          const grid = `${inferredCol}-${key}`;
          newGridsInvolved.push(grid);
        }
      }
    }

    setFormPage((prev) => {
      // console.log("index to replace: ", index);
      // console.log("prev: ", prev);
      const pageOfInterest = {
        ...prev[index],
        gridsToBeDropped: newGridsInvolved,
      };
      // console.log("page of interest: ", pageOfInterest);

      const newPages = [...prev];
      newPages.splice(index, 1, pageOfInterest);
      // console.log("new pages: ", newPages);

      return newPages;
    });

    console.log("new form page: ", formPage);
  };
  const setGridsOccupied = (
    colIndex,
    rowIndex,
    colNeeded,
    rowNeeded,
    index,
    mode
  ) => {
    if (mode === "add") {
      setFormPage((prev) => {
        const newGridsOccupied = { ...prev[index] }.gridsOccupied;
        // console.log("newGridsOccupied: ", newGridsOccupied);
        for (let i = rowIndex; i < rowIndex + rowNeeded; i++) {
          for (let j = colIndex; j < colIndex + colNeeded; j++) {
            newGridsOccupied[i][j] = 1;
          }
        }

        const newPages = [...prev];
        newPages.splice(index, 1, {
          ...prev[index],
          gridsOccupied: newGridsOccupied,
        });

        localStorage.setItem("pages", JSON.stringify(newPages));

        return newPages;
      });
    } else if (mode === "delete") {
    }
  };

  const [formPage, setFormPage] = useState(
    localStorage.getItem("pages")
      ? JSON.parse(localStorage.getItem("pages"))
      : [
          {
            gridsToBeDropped: [],
            gridsOccupied: [
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
            ],
            formPageNum: 0,
            committedComponents: [],
          },
        ]
  );
  const [dragOccur, setDragOccur] = useState(false);
  const [componentFit, setComponentFit] = useState(false);

  //dynamic table
  const [columns, setColumns] = useState([
    { id: "name", title: "Name" },
    { id: "age", title: "Age" },
    { id: "city", title: "City" },
  ]);
  const [rows, setRows] = useState([
    { id: 1, data: ["John", 25, "New York"] },
    { id: 2, data: ["Jane", 30, "London"] },
    { id: 3, data: ["Bob", 40, "Paris"] },
  ]);

  return (
    <FormBuilderContext.Provider
      value={{
        activeDragComponent, // only component structure
        setActiveDragComponent,
        setCommittedComponents,
        dragOccur,
        setDragOccur,
        setGridsToBeDropped,
        setGridsOccupied,
        componentFit,
        setComponentFit,
        columns,
        setColumns,
        formPage,
        setFormPage,
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
