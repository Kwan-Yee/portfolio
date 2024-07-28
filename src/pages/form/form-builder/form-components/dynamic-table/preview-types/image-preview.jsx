import { Upload } from "antd";
import React from "react";

function ImagePreview() {
  //TODO: web is upload and mobile is download
  return (
    <div style={{ width: "100%" }}>
      <Upload.Dragger style={{ color: "#5b5b5b" }}> Image </Upload.Dragger>
    </div> 
  );
}

export default ImagePreview;
