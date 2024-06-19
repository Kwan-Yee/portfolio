import React from "react";
import DynamicTable from "./dynamic-table";

/**
 *
 * @param {string} type - The type of components passed into this component
 * @returns Whichever component that matches the type
 */
function DynamicRenderer({ component }) {
  console.log("Component: ", component);
  const type = component.name;
  switch (type) {
    case "dynamic-table":
      return <DynamicTable />;
    default:
      return <div>DynamicRenderer</div>;
  }
}

export default DynamicRenderer;
