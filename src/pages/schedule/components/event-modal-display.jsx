import { Form, Formik } from "formik";
import React from "react";

import InputRow from "./event-modal-display-input";

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
        </Form>
      </Formik>
      <div
        className="modal-display-nonedittable"
        style={{ flex: 1, maxHeight: "100%" }}
      >
        Non Edittable
      </div>
    </div>
  );
}

export default EventModalDisplay;
