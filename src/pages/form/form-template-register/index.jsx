import React from "react";
import { Table } from "antd";

import listOfTemplates from "../../../mock-data-provider/list-of-templates";

const columns = [];
const data = [];

for (const property in listOfTemplates[0]) {
  if (property === "id" || property === "components") continue;
  columns.push({ title: property, dataIndex: property, key: property });
}

for (const template of listOfTemplates) {
  data.push({
    key: template.id,
    title: template.title,
    description: template.description,
    createdBy: template.createdBy,
    createdAt: template.createdAt,
    lastUpdatedAt: template.lastUpdatedAt,
    lastUpdatedBy: template.lastUpdatedBy,
    status: template.status,
    version: template.version,
  });
}

function TemplateRegister() {
  return (
    <div
      className="template-register-page-container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        className="template-register-table"
        style={{ flex: 10, paddingRight: "6px", boxSizing: "border-box" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>
      <div className="template-register-folders" style={{ flex: 2 }}>
        folders
      </div>
    </div>
  );
}

export default TemplateRegister;
