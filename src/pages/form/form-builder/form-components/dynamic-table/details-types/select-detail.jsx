import React, { useState } from "react";
import { Divider, Input } from "antd";
import { MdOutlineClose, MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function SelectDetail() {
  const [selections, setSelections] = useState([
    { id: `${uuidv4()}_Def-Select-Opt` },
  ]);

  /**
   * Updates the selections array by adding a new option at the specified index.
   *
   * @param {number} index - The index where the new option will be inserted.
   * @return {Array} The updated selections array with the new option added.
   */
  const handleAddOption = (index) => {
    if (selections.length >= 12) return;
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections.splice(index + 1, 0, { id: `${uuidv4()}_Def-Select-Opt` });
      return newSelections;
    });
  };

  /**
   * Updates the selections array by removing an option at the specified index.
   *
   * @param {number} index - The index of the option to be removed.
   * @return {Array} The updated selections array after removing the option.
   */
  const handleCloseOption = (index) => {
    if (selections.length <= 1) return;
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections.splice(index, 1);
      return newSelections;
    });
  };
  return (
    <div
      className="selections-options-define-list"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      {selections.map((selection, index) => (
        <div
          className="option-define-container"
          key={selection.id}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2px",
            alignItems: "center",
          }}
        >
          <Input
            size="small"
            placeholder={`Selection ${index + 1}`}
            addonBefore={`${index + 1}`}
          />
          <MdAdd
            style={{ cursor: "pointer" }}
            onClick={() => handleAddOption(index)}
          />
          <Divider type="vertical" style={{ margin: "2px" }} />
          <MdOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => handleCloseOption(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default SelectDetail;
