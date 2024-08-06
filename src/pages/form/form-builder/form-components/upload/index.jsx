import React, { useState } from "react";
import { Upload, Input } from "antd";
import { MdOutlineMoveToInbox } from "react-icons/md";

function UploadIndex() {
  //   const uploadTypeandMaxCount = {
  //     image: { type: "image", maxCount: 2 },
  //     file: { type: "file", maxCount: 10 },
  //   };
  //   const [uploadType, setUploadType] = useState("file");
  //   const props = {
  //     mutiple: true,
  //     name: uploadType,
  //     multiple: true,
  //   };
  return (
    <div
      className="upload-files-image-container"
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
        size="medium"
        placeholder="Upload header"
        addonBefore="Upload Header"
      />
      <Upload.Dragger disabled>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <MdOutlineMoveToInbox size={24} />
          Upload Files Or Images
        </div>
      </Upload.Dragger>
    </div>
  );
}

export default UploadIndex;
