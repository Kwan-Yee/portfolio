import React from "react";
import DynamicTable from "./dynamic-table";

/**
 *
 * @param {string} type - The type of components passed into this component
 * @returns Whichever component that matches the type
 */
function ComponentsInBuilder({ type }) {
  if (type === "dynamic-table") return <DynamicTable />;
  return <div>ComponentsInBuilder</div>;
}

export default ComponentsInBuilder;
