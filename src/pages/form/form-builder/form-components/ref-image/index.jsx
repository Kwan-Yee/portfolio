import { Input, Upload } from "antd";
import React from "react";
import { MdOutlineMoveToInbox } from "react-icons/md";

function RefImage() {
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
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
  return (
    <div
      className="ref-image-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <Input placeholder="Image header" addonBefore="Image header" />
      <Upload
        {...props}
      >
        <p className="upload-drag-icon">
          <MdOutlineMoveToInbox />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading
          company data or other banned files.
        </p>
      </Upload>
      <Input.TextArea placeholder="Image notes" addonBefore="Image notes" />
    </div>
  );
}

export default RefImage;
