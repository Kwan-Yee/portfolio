const listOfBuilderComponents = [
  {
    name: "dynamic-table",
    description: "A table that can dynamically increase rows when in use",
    gridsCol: 4,
    gridsRow: 2,
    minColumns: 2,
    minColumnWidth: "100px",
    maxColumns: 25,
    top: null,
    left: null,
    containerHeight: "auto",
    resize: false,
  },
  {
    name: "static-table",
    description: "A table that has a predefined number of rows when in use",
    gridsCol: 4,
    gridsRow: 2,
    minColumns: 2,
    minColumnWidth: "100px",
    maxColumns: 25,
    top: null,
    left: null,
    containerHeight: "auto",
    resize: true,
  },
  { name: "notes" },
  { name: "signature" },
  { name: "stamp" },
  { name: "Q & A" },
];

export default listOfBuilderComponents;
