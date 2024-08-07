import React from "react";
import { v4 as uuidv4 } from "uuid";

function CompAdder({ setCompsToRender, parentSection }) {
  const componentsInSection = [
    // {
    //   type: "static-table",
    //   newObj: {
    //     header: null,
    //     specs: {
    //       header: null,
    //       columnHeaders: [
    //         { id: "c1", header: null },
    //         { id: "c2", header: null },
    //       ],
    //       specs: {
    //         c1: { width: null, inputType: null, details: null },
    //         c2: { width: null, inputType: null, details: null },
    //       },
    //       rows: 2,
    //     },
    //   },
    // },

    {
      type: "dynamic-table",
      newObj: {
        header: null,
        columnHeaders: [
          { id: "c1", header: null },
          { id: "c2", header: null },
        ],
        specs: {
          c1: { width: null, inputType: null, details: null },
          c2: { width: null, inputType: null, details: null },
        },
      },
    },
    {
      type: "qna",
      newObj: {
        header: null,
        specs: { details: null },
      },
    },
    {
      type: "notes",
      newObj: {
        header: null,
        notes: null,
      },
    },
    { type: "signature", newObj: { header: null, notes: null } },
    { type: "stamp", newObj: { header: null, notes: null } },
    { type: "ref-image", newObj: { header: null, notes: null } },
    { type: "upload", newObj: { header: null, notes: null } },
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
              if (prev.length >= 12) {
                return [...prev];
              }
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
              localStorage.setItem(compId, JSON.stringify(comp.newObj));
              return [...prev, { type: comp.type, id: compId }];
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
