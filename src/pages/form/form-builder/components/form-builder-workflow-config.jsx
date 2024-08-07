import React, { useState } from "react";
import { Steps } from "antd";

function WorkflowConfig() {
  const [currentStep, setCurrentStep] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrentStep(value);
  };
  const description = "This is a description.";
  return (
    <div
      className="modal-content-container"
      style={{
        padding: "10px",
        width: "100%",
        height: "68vh",
        boxSizing: "border-box",
      }}
    >
      <div
        className="steps-container"
        style={{ width: "100%", overflowY: "auto" }}
      >
        <Steps
          current={currentStep}
          onChange={onChange}
          items={[
            {
              title: "Step 1",
              description,
              style: { minWidth: "200px" },
            },
            {
              title: "Step 2",
              description,
              style: { minWidth: "200px" },
            },
            {
              title: "Step 3",
              description,
              style: { minWidth: "200px" },
            },
            {
              title: "Step 3",
              description,
              style: { minWidth: "200px" },
            },
            {
              title: "Step 3",
              description,
              style: { minWidth: "200px" },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default WorkflowConfig;
