import React, { useContext, createContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  // const [builderTab, setBuilderTab] = useState("Builder");

  return <FormContext.Provider value={{}}>{children}</FormContext.Provider>;
}

/**
 *
 * @returns A custom FORM hook that provides access to the {context, mutator methods}
 */
export const useFormContext = () => useContext(FormContext);
