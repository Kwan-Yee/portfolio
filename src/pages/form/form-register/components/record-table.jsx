import { Table } from "antd";
import React from "react";

function RecordTable() {
  //TODO: generate records, with sub forms
  const formRecordsColumns = [
    {
      title: "Ref. Number",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Created By",
      dataIndex: "createdBt",
      key: "created_at",
    },
    {
      title: "Creator Company",
      dataIndex: "creatorCompany",
      key: "created_at",
    },
  ];

  return (
    <div className="record-table-container">
      <Table columns={formRecordsColumns} />
    </div>
  );
}

export default RecordTable;
