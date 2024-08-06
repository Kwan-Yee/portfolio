import React from "react";
import DynamicTable from "./dynamic-table";
import StaticTable from "./static-table";
import QnA from "./qna";
import Notes from "./notes";
import Signature from "./signature";
import Stamp from "./stamp";
import RefImage from "./ref-image";
import UploadIndex from "./upload";

/**
 *
 * @param {string} type - The type of components passed into this component
 * @returns Whichever component that matches the type
 */
function ComponentsIndex({ type, compId }) {
  if (type === "dynamic-table") return <DynamicTable compId={compId} />;
  if (type === "static-table") return <StaticTable compId={compId} />;
  if (type === "qna") return <QnA compId={compId} />;
  if (type === "notes") return <Notes compId={compId} />;
  if (type === "signature") return <Signature compId={compId} />;
  if (type === "stamp") return <Stamp compId={compId} />;
  if (type === "ref-image") return <RefImage compId={compId} />;
  if (type === "upload") return <UploadIndex compId={compId} />;
  return <div>ComponentsIndex</div>;
}

export default ComponentsIndex;
