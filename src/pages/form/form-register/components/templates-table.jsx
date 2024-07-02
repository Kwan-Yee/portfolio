import { Table, Space, Tag, Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { generateTemplates } from "../../../../mock-data-provider/list-of-templates";

function TemplatesTable() {
  const { parents, children } = generateTemplates();
  console.log("parents: ", parents);
  console.log("children: ", children);

  const navigate = useNavigate();

  const excludeKeys = [
    "id",
    "childTemplates",
    "parentTemplates",
    "sections",
    "draftId",
    "refNumberFormat",
    "publishedAt",
    "workflowId",
    "parentTemplate",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
    "published",
    // "publishedBy",
  ];

  const columnWidth = {
    title: "25%",
    description: "50%",
    version: "85px",
    publishedBy: "200px",
  };

  const columns = Object.keys(parents[0])
    .filter((key) => !excludeKeys.includes(key))
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
      width: columnWidth[key] || "max-content",
      ellipsis: true,
      align: ["version"].includes(key) ? "center" : "left",
    }));

  //Add actions column
  const updatedColumns = [
    ...columns,
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      width: "100px",
      align: "center",
      render: (_, record) => {
        return record.parentTemplate ? (
          <Space>
            <a
              onClick={() => {
                console.log("record: ", record);
                navigate(`/permits/builder/${record.id}`);
              }}
            >
              Edit
            </a>
          </Space>
        ) : (
          <Space>
            <a
              onClick={() => {
                console.log("record: ", record);
                navigate(`/permits/builder/${record.id}`)``;
              }}
            >
              Edit
            </a>
            <Divider
              style={{
                margin: "0px",
                backgroundColor: "#5b5b5b",
                // width: "2px",
              }}
              type="vertical"
            />
            <a
              onClick={() => {
                console.log("record: ", record);
                //TODO: create new sub form
                navigate();
              }}
            >
              +Sub
            </a>
          </Space>
        );
      },
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      width: "100px",
      align: "center",
      render: (_, record) => (
        <Tag color={record.published ? "green" : "red"}>
          {record.published ? "Yes" : "No"}
        </Tag>
      ),
    },
  ];

  console.log("headers:", columns);

  const expandedRow = (parentId) => {
    const childrenColumns = updatedColumns;

    return (
      <Table
        title={() => (
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid #5b5b5b",
              fontWeight: "bold",
            }}
          >
            Sub-Forms
          </div>
        )}
        bordered
        size="small"
        columns={childrenColumns}
        dataSource={children
          .filter((child) => child.parentTemplate === parentId)
          .map((child) => ({ ...child, key: child.id }))}
        showHeader={false}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        pagination={false}
      />
    );
  };

  return (
    <div className="templates-table-container" style={{ overflowY: "auto" }}>
      <Table
        style={{ boxSizing: "border-box" }}
        title={() => (
          <div
            style={{
              width: "max-content",
              fontWeight: "bold",
              marginTop: "0px",
              borderBottom: "1px solid #5b5b5b",
              width: "100%",
            }}
          >
            Main-Forms
          </div>
        )}
        pagination={{ pageSize: 25 }}
        scroll={{ y: "720px" }}
        size="large"
        columns={updatedColumns}
        dataSource={parents.map((parent) => ({
          ...parent,
          key: parent.id,
        }))}
        expandable={{
          expandedRowRender: (record) => expandedRow(record.id),
          rowExpandable: (record) => record.childTemplates.length > 0,
          // defaultExpandedRowKeys: ["0"],
        }}
        onRow={(record) => {
          return { style: { minHeight: "40px" } };
        }}
        bordered
      />
    </div>
  );
}

export default TemplatesTable;
