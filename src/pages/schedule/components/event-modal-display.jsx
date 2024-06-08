import { Form, Formik } from "formik";
import React from "react";

import InputRow from "./event-modal-display-input";
import { Divider } from "antd";

function EventModalDisplay() {
  return (
    <div
      className="modal-display-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
        }}
        onSubmit={async (values) => {}}
      >
        <Form style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          <InputRow type="text" name="title" />
          <InputRow type="date" name="date" />
          <InputRow type="time" name="start-time" />
          <InputRow type="time" name="end-time" />
          <InputRow type="select" name="location" />
          <InputRow type="text" name="attendees" />
          <InputRow type="textarea" name="description" />
          <InputRow type="url" name="link" />
          <div
            className="modal-display-nonedittable"
            style={{ flex: 1, maxHeight: "100%" }}
          >
            <hr
              style={{
                width: "97%",
                opacity: "30%",
                height: "1px",
                backgroundColor: "#5b5b5b",
                border: "none",
              }}
            />
            <InputRow type="nonedittable-text" name="created-by" />
            <InputRow type="nonedittable-text" name="created-at" />
            <InputRow type="nonedittable-text" name="iD" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EventModalDisplay;
