import React from "react";
import { v4 as uuidv4 } from "uuid";

function CompAdder({ setCompsToRender, parentSection }) {
  const componentsInSection = [
    { type: "static-table" },
    { type: "qna" },
    { type: "dynamic-table" },
    { type: "notes" },
    { type: "signature" },
    { type: "stamp" },
    { type: "ref-image" },
  ];
  return (
    <div
      className="comp-adder-container"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // border: "1px solid black",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "14px",
      }}
    >
      {componentsInSection.map((comp) => (
        <div
          key={comp.type}
          className="comp-adder-item"
          onClick={() => {
            console.log("comp: ", comp);
            setCompsToRender((prev) => {
              const compId = `${uuidv4()}_Comp`;
              //save to LS
              const section = JSON.parse(localStorage.getItem(parentSection));
              const newSection = {
                ...section,
                children: [
                  ...section.children,
                  { type: comp.type, id: compId },
                ],
              };
              localStorage.setItem(parentSection, JSON.stringify(newSection));
              return [...prev, { type: comp.type, id: `${uuidv4()}_` }];
            });
          }}
          style={{
            padding: "8px",
            border: "2px dashed rgba(0,0,0,0.5)",
            borderRadius: "8px",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          {comp.type}
        </div>
      ))}
    </div>
  );
}

export default CompAdder;
