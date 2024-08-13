import React, { useState } from "react";
import { Select, Steps, Divider, Card, Switch, Input } from "antd";
import styled from "styled-components";

const Header = styled.p`
  margin: 8px 0px;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  min-height: 3em;
`;

function WorkflowConfig() {
  const [currentStep, setCurrentStep] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrentStep(value);
  };

  const sectionsFromLS = JSON.parse(localStorage.getItem("sections"));
  // console.log(sectionsFromLS);
  const [publishOnCreation, setPublishOnCreation] = useState(true);

  // convert sectionsFromLS to an Array of objects with legit properties for "items" in <Steps></Steps>
  // The "description" props is used to display the configurations at each step.
  const itemsInSteps = sectionsFromLS.map((sectionId, index) => {
    if (localStorage.getItem(sectionId))
      return {
        title: `Section ${index + 1}`,
        // icon: <div className="section-icon">{index}</div>,
        description: (
          <div
            className={`step-description-${index}-container`}
            style={{
              minWidth: "200px",
              width: "100%",
              maxWidth: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <Header style={{}}>
              {JSON.parse(localStorage.getItem(sectionId)).title != ""
                ? JSON.parse(localStorage.getItem(sectionId)).title
                : "Section Header"}
            </Header>
            {/* <Divider /> */}
            <div className="section-assignee">
              <Select
                size="small"
                style={{ width: "100%" }}
                placeholder="Assignee"
                mode="multiple"
              />
            </div>
            <Card
              style={{ marginTop: "8px" }}
              styles={{ body: { padding: "6px" } }}
            >
              {index == 0 ? (
                <div
                  className="publish-on-creation"
                  style={{
                    gap: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                >
                  <p style={{ margin: "2px" }}>Publish on creation : </p>
                  <Switch
                    checked={publishOnCreation}
                    onClick={() => setPublishOnCreation(!publishOnCreation)}
                  />
                </div>
              ) : (
                <div
                  className="initial-status"
                  style={{
                    gap: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: "2px" }}>Initial Status : </p>
                  <Input size="small" placeholder="Status" maxLength={25} />
                </div>
              )}
              <Divider />
              <Card styles={{ body: { padding: "6px" } }}>
                {index == 0 ? (
                  <div className="draft-publish">
                    <div
                      className="draft"
                      style={{
                        gap: "4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        className="draft-title"
                        style={{ fontStyle: "italic", fontWeight: "bold" }}
                      >
                        Draft :
                      </div>
                      <p>
                        Upon creation of a record with this template, the record
                        will be{" "}
                        {publishOnCreation
                          ? "immediately published upon creation."
                          : "in draft unless it is published."}
                      </p>
                    </div>
                    <Divider />
                    <div
                      className="publish"
                      style={{
                        gap: "4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        className="publish-title"
                        style={{ fontWeight: "bold", fontStyle: "italic" }}
                      >
                        Published :
                      </div>
                      <p style={{ margin: "2px" }}>Published Status : </p>
                      <Input size="small" placeholder="Status" maxLength={25} />
                    </div>
                  </div>
                ) : (
                  <div className="approve-reject">
                    <div
                      className="approve"
                      style={{
                        gap: "4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        className="approve-title"
                        style={{ fontWeight: "bold", fontStyle: "italic" }}
                      >
                        Approved :
                      </div>
                      <p style={{ margin: "2px" }}>Approved Status : </p>
                      <Input size="small" placeholder="Status" maxLength={25} />
                    </div>
                    <Divider />
                    <div
                      className="reject"
                      style={{
                        gap: "4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        className="reject-title"
                        style={{ fontWeight: "bold", fontStyle: "italic" }}
                      >
                        Rejected :
                      </div>
                      <p style={{ margin: "2px" }}>Rejected Status : </p>
                      <Input size="small" placeholder="Status" maxLength={25} />
                    </div>
                  </div>
                )}
              </Card>
            </Card>
          </div>
        ),
        style: { minWidth: "26%", maxWidth: "26%" },
      };
  });

  return (
    <div
      className="modal-content-container"
      style={{
        width: "100%",
        height: "68vh",
        boxSizing: "border-box",
      }}
    >
      <div
        className="steps-container"
        style={{ width: "100%", overflowX: "auto", height: "100%" }}
      >
        <Steps
          current={currentStep}
          onChange={(value) => onChange(value)}
          items={itemsInSteps}
          // type="navigation"
        />
      </div>
    </div>
  );
}

export default WorkflowConfig;
