import React, { useState } from "react";
import { Select, Steps, Divider, Card, Switch, Input, InputNumber } from "antd";
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

  const initialTimeSensitivityByStep = {};
  sectionsFromLS.map((section, index) => {
    return { ...initialTimeSensitivityByStep, [index]: false };
  });
  const [timeSensitivityByStep, setTimeSensitivityByStep] = useState(
    initialTimeSensitivityByStep
  );

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
              // minWidth: "225px",
              width: "175%",
              // maxWidth: "400px",
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
                disabled={currentStep != index}
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
                    disabled={currentStep != index}
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
                  <Input
                    disabled={currentStep != index}
                    size="small"
                    placeholder="Status"
                    maxLength={25}
                  />
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
                      <Input
                        disabled={currentStep != 0}
                        size="small"
                        placeholder="Status"
                        maxLength={25}
                      />
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
                        Proceed :
                      </div>
                      <p style={{ margin: "2px" }}>Custom Status : </p>
                      <Input
                        disabled={currentStep != index}
                        size="small"
                        placeholder="Status"
                        maxLength={25}
                      />
                    </div>
                    <Divider style={{ margin: "8px" }} />
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
                        Revert :
                      </div>
                      <p style={{ margin: "2px" }}>Custom Status : </p>
                      <Input
                        disabled={currentStep != index}
                        size="small"
                        placeholder="Status"
                        maxLength={25}
                      />
                    </div>
                  </div>
                )}
              </Card>
              {index != 0 && (
                <>
                  <div
                    className="time-sensitivity-switch"
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      gap: "4px",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ margin: "2px" }}>Time Sensitivity : </p>
                    <Switch disabled={currentStep != index} size="small" />
                  </div>
                  <Card styles={{ body: { padding: "6px" } }}>
                    <div
                      className="time-duration-inputs"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "4px",
                      }}
                    >
                      <InputNumber
                        addonBefore="D"
                        size="small"
                        min={0}
                        max={15}
                        placeholder="0"
                        controls={false}
                      />
                      <InputNumber
                        addonBefore="H"
                        size="small"
                        min={0}
                        max={23}
                        placeholder="0"
                        controls={false}
                      />
                      <InputNumber
                        addonBefore="M"
                        size="small"
                        min={0}
                        max={59}
                        placeholder="0"
                        controls={false}
                      />
                    </div>
                  </Card>
                </>
              )}
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
        />
      </div>
    </div>
  );
}

export default WorkflowConfig;
