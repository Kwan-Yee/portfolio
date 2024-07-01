import React, { createContext, useState, useContext } from "react";

const FullAppContext = createContext();

export function FullAppProvider({ children }) {
  const [selectedModule, setSelectedModule] = useState("Landing");
  return (
    <FullAppContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </FullAppContext.Provider>
  );
}

export const useFullAppContext = () => useContext(FullAppContext);
