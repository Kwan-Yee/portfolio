import React from "react";
import { Drawer, Card, Divider, Tag } from "antd";
import styled from "styled-components";

const Detail = styled.p`
  margin: 0;
  padding-left: 8px;
`;

function IssuesCard({ issue }) {
  const statusTagColour = (status) => {
    switch (status) {
      case "Open":
        return "#FFA500";
      case "Stale":
        return "#5b5b5b";
      case "Closed":
        return "#7ab890";
      default:
        return "gray";
    }
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <div>
      <Drawer
        title={issue.title}
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={800}
      >
        <div>{issue.description}</div>
      </Drawer>
      <Card
        extra={<a onClick={() => setOpenDrawer(true)}>View</a>}
        title={
          <div
            className="issue-title-container"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              className="issue-category-container"
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.1)",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              {issue.category}
            </div>
            <Divider
              type="vertical"
              style={{ height: "100%", margin: "0 4px" }}
            />
            {issue.title}
          </div>
        }
        size="small"
        style={{ width: "100%", marginBottom: "4px" }}
        key={issue.id}
      >
        <div
          className="issue-content-container"
          style={{ gap: "4px", display: "flex", flexDirection: "row" }}
        >
          <img
            src={issue.image}
            style={{ flex: 2, width: "120px", height: "120px" }}
          />
          <div
            className="issue-description"
            style={{ flex: 10, display: "flex", flexDirection: "column" }}
          >
            <h4
              style={{
                margin: "0px",
                paddingLeft: "8px",
                fontWeight: "normal",
              }}
            >
              {issue.description}
            </h4>
            <Divider style={{ width: "100%", margin: "4px" }} />
            <Detail>Created by: {issue.createdBy}</Detail>
            <Detail>Created at: {issue.createdAt.toDateString()}</Detail>
            <Detail>
              Status:{" "}
              <Tag color={statusTagColour(issue.status)}>{issue.status}</Tag>
            </Detail>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default IssuesCard;
