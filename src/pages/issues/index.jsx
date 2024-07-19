import { Button, Calendar, Card, Divider, Select } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { generateIssues } from "../../mock-data-provider/list-of-issues";
import { IoAddOutline } from "react-icons/io5";
import { GrLinkTop } from "react-icons/gr";

const IssuesPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const IssuesFiltersContainer = styled.div`
  display: flex;
  flex: 2;
  flex-grow: 0;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 6px;
  box-sizing: border-box;
  gap: 4px;
`;

const IssuesContainer = styled.div`
  display: flex;
  flex: 10;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const IssuesActionsContainer = styled.div`
  display: flex;
  flex-basis: 68px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 18px 6px;
  box-sizing: border-box;
  gap: 8px;
  align-items: center;
  justify-content: start;
`;

function Issues() {
  const [issues, setIssues] = useState(generateIssues(50));
  const issuesSorted = issues.sort((a, b) => b.createdAt - a.createdAt);
  return (
    <IssuesPageContainer>
      <IssuesFiltersContainer>
        <Calendar
          fullscreen={false}
          style={{
            minWidth: "366px",
            maxWidth: "86%",
            border: "1px solid #e5e5e5",
          }}
        />
        <Card style={{ width: "100%" }} title="Category" size="small">
          <Select style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Created by" size="small">
          <Select style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Assignee" size="small">
          <Select style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Location" size="small">
          <Select style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Status" size="small">
          <Select style={{ width: "100%" }} size="small" />
        </Card>
      </IssuesFiltersContainer>
      <Divider type="vertical" style={{ height: "96%", margin: "4px" }} />
      <IssuesContainer>
        {issuesSorted.map((issue) => (
          <Card
            title={issue.title}
            size="small"
            style={{ width: "100%", marginBottom: "4px" }}
            key={issue.id}
          >
            <p>{issue.description}</p>
          </Card>
        ))}
      </IssuesContainer>
      <IssuesActionsContainer>
        <Button
          shape="circle"
          size="large"
          type="primary"
          icon={<IoAddOutline style={{ fontSize: "26px" }} />}
        />
        <Button
          shape="circle"
          size="large"
          type="dashed"
          icon={<GrLinkTop style={{ fontSize: "16px" }} />}
        />
      </IssuesActionsContainer>
    </IssuesPageContainer>
  );
}

export default Issues;
