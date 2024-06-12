import { min } from "date-fns";

export const listOfComponents = [
  {
    name: "dynamic-table",
    description: "A table that can dynamically increase rows",
    builder: {
      fullWidth: true,
      minColumns: 2,
      minColumnWidth: "100px",
      maxColumns: 25,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      containerHeight: "auto",
    },
    usage: {
      fullWidth: true,
      minColumnWidth: "100px",
      maxRows: 50,
      minRows: 1,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      containerHeight: "auto",
    },
  },
];
