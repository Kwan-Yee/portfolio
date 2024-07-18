import React, { createContext, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

const FullAppContext = createContext();

export function FullAppProvider({ children }) {
  const location = useLocation();
  const module = location.pathname.split("/")[1];

  const [selectedModule, setSelectedModule] = useState(
    module == "" ? "home" : module
  );
  // const [selectedSubModule, setSelectedSubModule] = useState(null);
  return (
    <FullAppContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </FullAppContext.Provider>
  );
}

export const useFullAppContext = () => useContext(FullAppContext);