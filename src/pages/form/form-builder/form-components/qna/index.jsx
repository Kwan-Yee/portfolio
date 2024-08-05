import { Button, Divider, Input, Select, Switch } from "antd";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import PreviewIndex from "./preview-types";

function QnA() {
  const inputExpected = [
    { value: "datetime", label: "Datetime" },
    { value: "image", label: "Image" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
    { value: "text", label: "Text" },
  ];

  const [questionRows, setQuestionRows] = useState([
    { question: null, inputType: null, preview: null, id: "q1" },
  ]);
  return (
    <div
      className="qna-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        padding: "4px",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
      }}
    >
      <Input
        size="medium"
        placeholder="Question Header"
        addonBefore="Question Header"
      />
      <div className="qna-answer-details-preview" style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ display: "flex", flexDirection: "row" }}>
              <th style={{ flex: 6, fontSize: "16px", fontWeight: "normal" }}>
                Question
              </th>
              <th style={{ flex: 2, fontSize: "16px", fontWeight: "normal" }}>
                Input Type
              </th>
              <th style={{ flex: 4, fontSize: "16px", fontWeight: "normal" }}>
                Preview
              </th>
              <div
                className="row-delete-button"
                style={{
                  flexBasis: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {""}
              </div>
            </tr>
          </thead>
          <tbody>
            {questionRows.map((row) => (
              <tr
                key={row.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "4px",
                }}
              >
                <td style={{ flex: 6 }}>
                  <Input
                    size="small"
                    placeholder="Question"
                  />
                </td>
                <td style={{ flex: 2 }}>
                  <Select
                    size="small"
                    options={inputExpected}
                    style={{ width: "100%" }}
                    placeholder="Input type"
                    onChange={
                      (value) => {
                        setQuestionRows((prev) => {
                          return prev.map((r) => {
                            if (r.id === row.id) {
                              return { ...r, inputType: value };
                            }
                            return r;
                          });
                        })
                      }}
                    // options={inputExpected}
                  />
                </td>
                <td style={{ flex: 4 }}>
                  <PreviewIndex selectedInputType={row.inputType}/>
                </td>
                <div
                  className="row-delete-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MdClose
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (questionRows.length <= 1) return;
                      setQuestionRows(
                        questionRows.filter((r) => r.id !== row.id)
                      );
                    }}
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        <Divider style={{ margin: "4px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "4px",
          }}
        >
          <Button
            size="small"
            type="default"
            style={{
              borderColor: "#7AB890",
              color: "#7AB890",
              marginTop: "2px",
            }}
            onClick={() => {
              if (questionRows.length >= 20) return;
              setQuestionRows([
                ...questionRows,
                {
                  question: null,
                  inputType: null,
                  preview: null,
                  id: `q${questionRows.length + 1}`,
                },
              ]);
            }}
          >
            Add row
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QnA;
