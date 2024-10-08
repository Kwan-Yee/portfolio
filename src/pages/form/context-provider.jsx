import { Input } from "antd";
import React, { useContext, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FormBuilderContext = createContext();

export function FormBuilderProvider({ children }) {
  const [activeDragComponent, setActiveDragComponent] = useState(null);
  const [sections, setSections] = useState(
    localStorage.getItem("sections")
      ? JSON.parse(localStorage.getItem("sections"))
      : [`${uuidv4()}_Section`]
  );

  const [formTitle, setFormTitle] = useState("");

  const [templateEditing, setTemplateEditing] = useState(null);

  const [allSectionsCollapse, setAllSectionsCollapse] = useState(false);

  return (
    <FormBuilderContext.Provider
      value={{
        activeDragComponent,
        setActiveDragComponent,
        sections,
        setSections,
        allSectionsCollapse,
        setAllSectionsCollapse,
        templateEditing,
        setTemplateEditing,
        formTitle,
        setFormTitle,
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
