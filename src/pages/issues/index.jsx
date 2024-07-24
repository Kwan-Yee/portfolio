import {
  Button,
  Calendar,
  Card,
  Divider,
  Modal,
  Select,
  Tag,
  Input,
  Upload,
  Space,
  DatePicker,
  Drawer,
} from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { generateIssues } from "../../mock-data-provider/list-of-issues";
import { IoAddOutline } from "react-icons/io5";
import { GrLinkTop } from "react-icons/gr";
import { MdOutlinePostAdd } from "react-icons/md";
import IssuesDrawer from "./components/issue-card";
import IssuesCard from "./components/issue-card";

const IssuesPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

const IssuesFiltersContainer = styled.div`
  display: flex;
  flex: 2.5;
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
  flex: 11;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
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
  const [issuesFilter, setIssuesFilter] = useState({
    createdAt: [],
    status: [],
    category: [],
    location: [],
    assignee: [],
    createdBy: [],
  });
  const [issues, setIssues] = useState(generateIssues(50));

  const issuesFiltered = issues.filter((issue) => {
    let toInclude = true;
    if (issuesFilter.status.length != 0) {
      toInclude =
        toInclude && issuesFilter.status.includes(issue.status.toLowerCase());
    }
    if (issuesFilter.category.length != 0) {
      // console.log("Fired");
      toInclude =
        toInclude &&
        issuesFilter.category.includes(issue.category.toLowerCase());
    }
    if (issuesFilter.location.length != 0) {
      console.log("Fired");
      console.log("location filter: ", issuesFilter.location);
      console.log("location: ", issue.location.toLowerCase().replace(" ", "_"));
      toInclude =
        toInclude &&
        issuesFilter.location.includes(
          issue.location.toLowerCase().replace(" ", "_")
        );
    }
    if (issuesFilter.assignee.length != 0) {
      toInclude = toInclude && issuesFilter.assignee.includes(issue.assignee);
    }
    if (issuesFilter.createdBy.length != 0) {
      toInclude = toInclude && issuesFilter.createdBy.includes(issue.createdBy);
    }
    if (issuesFilter.createdAt.length != 0) {
      toInclude = toInclude && issuesFilter.createdAt.includes(issue.createdAt);
    }
    return toInclude;
  });
  const issuesSorted = issuesFiltered.sort((a, b) => b.createdAt - a.createdAt);

  const [createIssueModalVisible, setCreateIssueModalVisible] = useState(false);

  const statuses = [
    { value: "open", label: "Open" },
    { value: "stale", label: "Stale" },
    { value: "closed", label: "Closed" },
  ];

  const categories = [
    { value: "safety", label: "Safety" },
    { value: "cleanliness", label: "Cleanliness" },
    { value: "quality", label: "Quality" },
    { value: "misc", label: "Misc" },
    { value: "site", label: "Site" },
  ];

  const locations = [
    { value: "location_1", label: "Location 1" },
    { value: "location_2", label: "Location 2" },
    { value: "location_3", label: "Location 3" },
    { value: "location_4", label: "Location 4" },
    { value: "location_5", label: "Location 5" },
  ];

  return (
    <IssuesPageContainer>
      <IssuesFiltersContainer>
        <Button
          icon={
            <IoAddOutline
              style={{ margin: "none", fontSize: "20px", fontWeight: "2px" }}
            />
          }
          type="primary"
          size="large"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
          onClick={() => setCreateIssueModalVisible(true)}
        >
          Post Issues
        </Button>
        {/** TODO: Create issues with modal */}
        <Modal
          title={
            <Space>
              <MdOutlinePostAdd style={{ fontSize: "20px" }} />
              New Issue
            </Space>
          }
          open={createIssueModalVisible}
          onOk={() => {}}
          onCancel={() => {
            setCreateIssueModalVisible(false);
          }}
        >
          Title: <Input size="small" placeholder="Title" />
          Description: <Input.TextArea size="small" placeholder="Description" />
          Category: <Select style={{ width: "100%" }} size="small" />
          Image: <Upload.Dragger>Upload Or Drag Image here</Upload.Dragger>
          <Divider style={{ margin: "8px 0" }} />
        </Modal>
        <div
          className="clear-filters-button-container"
          style={{ width: "100%", display: "flex", justifyContent: "end" }}
        >
          <Button
            type="text"
            size="small"
            onClick={() =>
              setIssuesFilter({
                createdAt: [],
                status: [],
                category: [],
                location: [],
                assignee: [],
                createdBy: [],
              })
            }
          >
            Clear all
          </Button>
        </div>

        <Card style={{ width: "100%" }} title="Created At" size="small">
          <DatePicker style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Category" size="small">
          <Select
            mode="tags"
            options={categories}
            style={{ width: "100%" }}
            size="small"
            value={issuesFilter.category}
            onChange={(value) => {
              setIssuesFilter({ ...issuesFilter, category: value });
            }}
          />
        </Card>
        <Card style={{ width: "100%" }} title="Created by" size="small">
          <Select mode="tags" style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Assignee" size="small">
          <Select mode="tags" style={{ width: "100%" }} size="small" />
        </Card>
        <Card style={{ width: "100%" }} title="Location" size="small">
          <Select
            mode="tags"
            options={locations}
            style={{ width: "100%" }}
            size="small"
            onChange={(value) => {
              setIssuesFilter({ ...issuesFilter, location: value });
            }}
          />
        </Card>
        <Card style={{ width: "100%" }} title="Status" size="small">
          <Select
            mode="tags"
            options={statuses}
            style={{ width: "100%" }}
            size="small"
            onChange={(value) => {
              setIssuesFilter({ ...issuesFilter, status: value });
            }}
          />
        </Card>
      </IssuesFiltersContainer>
      <Divider type="vertical" style={{ height: "96%", margin: "4px" }} />
      <IssuesContainer>
        <Button
          shape="circle"
          size="large"
          type="default"
          icon={<GrLinkTop style={{ fontSize: "16px" }} />}
          style={{
            position: "sticky",
            top: "90%",
            left: "95%",
            zIndex: "10",
            boxSizing: "border-box",
          }}
        />
        <h1 style={{ marginTop: "6px" }}>Issues</h1>
        {issuesSorted.map((issue, index) => (
          <div key={issue.id}>
            {issuesSorted[index - 1]?.createdAt.getDate() !==
              issue.createdAt.getDate() && (
              <h3>{issue.createdAt.toDateString()}</h3>
            )}
            <IssuesCard issue={issue} />
          </div>
        ))}
      </IssuesContainer>
    </IssuesPageContainer>
  );
}

export default Issues;
