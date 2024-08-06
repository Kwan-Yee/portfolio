import { Input, Upload } from "antd";
import React, { useState } from "react";
import { MdOutlineMoveToInbox } from "react-icons/md";

function RefImage({ compId }) {
  console.log("ref img compId: ", compId);

  const [refImgCompState, setRefImgCompState] = useState(
    localStorage.getItem(compId)
      ? JSON.parse(localStorage.getItem(compId))
      : null
  );

  const handleImgCompInput = (value, modifiedInput) => {
    setRefImgCompState((prev) => {
      return { ...prev, [modifiedInput]: value };
    });
    // console.log(value);
    const item = JSON.parse(localStorage.getItem(compId));
    if (!item) return;
    if (modifiedInput === "header") item.header = value;
    if (modifiedInput === "notes") item.notes = value;
    localStorage.setItem(compId, JSON.stringify(item));
  };

  const props = {
    name: "image",
    accept: "image/*",
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const { Dragger } = Upload;
  return (
    <div
      className="ref-image-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <Input
        placeholder="Image header"
        addonBefore="Reference Image header"
        value={refImgCompState?.header}
        onChange={(e) => handleImgCompInput(e.target.value, "header")}
      />
      <Dragger {...props}>
        <p className="upload-drag-icon">
          <MdOutlineMoveToInbox size={36} />
        </p>
        <p className="ant-upload-text">
          Click or drag image to this area to upload. Accepting jpg, png, jpeg.
        </p>
        
      </Dragger>
      <Input.TextArea
        placeholder="Image notes"
        value={refImgCompState?.notes}
        onChange={(e) => handleImgCompInput(e.target.value, "notes")}
      />
    </div>
  );
}

export default RefImage;
