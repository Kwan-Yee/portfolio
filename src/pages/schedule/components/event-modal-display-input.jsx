import { AutoComplete, DatePicker, Input, TimePicker } from "antd";
import React from "react";

import dayjs from "dayjs";

import { useScheduleContext } from "../context-provider";

function InputRow({ type, name }) {
  const { modalEditMode, selectedEvent } = useScheduleContext();

  console.log(typeof selectedEvent?.date);
  const dynamicComponent = (inputType) => {
    switch (inputType) {
      case "textarea":
        return (
          <Input.TextArea
            style={{
              flex: 2,
              border: !modalEditMode ? "1px solid transparent" : null,
            }}
            disabled={!modalEditMode}
            value={selectedEvent?.description}
          />
        );
      case "select":
        return (
          <AutoComplete
            style={{
              flex: 2,
              flexShrink: 0,
              boxSizing: "border-box",
              border: !modalEditMode ? "1px solid transparent" : null,
            }}
            disabled={!modalEditMode}
            value={selectedEvent?.location}
          />
        );
      //FIXME: start and end time needs to be conditionally different but they are both being rendered by this component
      case "time":
        return (
          <TimePicker
            style={{
              flex: 2,
              border: !modalEditMode ? "1px solid transparent" : null,
            }}
            disabled={!modalEditMode}
            // value={dayjs(selectedEvent?.startTime)} //FIXME: dayjs takes the whole date object
          />
        );
      case "date":
        return (
          <DatePicker
            style={{
              flex: 2,
              border: !modalEditMode ? "1px solid transparent" : null,
            }}
            disabled={!modalEditMode}
            value={dayjs(selectedEvent?.date || new Date())}
          />
        );
      default:
        return !type.includes("nonedittable") ? (
          // FIXME: all text fields are rendered here, their values need to be conditionally rendered
          <Input
            type={type}
            style={{
              flex: 2,
              border: !modalEditMode ? "1px solid transparent" : null,
            }}
            allowClear
            disabled={!modalEditMode}
          />
        ) : (
          <Input
            type={type.split("-")[1]}
            disabled
            style={{ flex: 2, border: "none" }}
          />
        );
    }
  };
  return (
    <div
      className="modal-display-input"
      style={{
        flex: type === "textarea" ? 3 : 1,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        fontFamily: "Roboto, sans-serif",
        margin: "3px 0px",
        height: "26px",
      }}
    >
      <label
        htmlFor={name}
        style={{
          flex: 1,
          display: "flex",
          textTransform: "capitalize",
          alignItems: type === "textarea" ? "start" : "center",
          justifyContent: "right",
          paddingRight: "12px",
          paddingTop: "2px",
          maxWidth: "26%",
        }}
      >
        {name}
      </label>
      <>{dynamicComponent(type)}</>
    </div>
  );
}

export default InputRow;
