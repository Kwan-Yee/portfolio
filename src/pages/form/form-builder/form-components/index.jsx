import React from "react";
import DynamicTable from "./dynamic-table";
import StaticTable from "./static-table";
import QnA from "./Q & A";
import Notes from "./notes";
import Signature from "./signature";
import Stamp from "./stamp";

/**
 *
 * @param {string} type - The type of components passed into this component
 * @returns Whichever component that matches the type
 */
function ComponentsIndex({ type }) {
  if (type === "dynamic-table") return <DynamicTable />;
  if (type === "static-table") return <StaticTable />;
  if (type === "qna") return <QnA />;
  if (type === "notes") return <Notes />;
  if (type === "signature") return <Signature />;
  if (type === "stamp") return <Stamp />;
  return <div>ComponentsIndex</div>;
}

export default ComponentsIndex;