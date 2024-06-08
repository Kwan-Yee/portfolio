import { AutoComplete, DatePicker, Input, TimePicker } from "antd";
import React from "react";
import styled from "styled-components";

const Spacer = styled.div`
  flex: ${(props) => props.flex || 0.2};
`;

function InputRow({ type, name }) {
  const dynamicComponent = (inputType) => {
    switch (inputType) {
      case "textarea":
        return <Input.TextArea style={{ flex: 2 }} />;
      case "select":
        return (
          <AutoComplete
            style={{
              flex: 2,
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          />
        );
      case "time":
        return <TimePicker style={{ flex: 2 }} />;
      case "date":
        return <DatePicker style={{ flex: 2 }} />;
      default:
        return <Input type={type} style={{ flex: 2 }} allowClear />;
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
