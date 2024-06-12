import { Button } from "antd";
import React from "react";
import { RiDraftLine } from "react-icons/ri";
import { MdOutlinePublish } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useHover } from "@uidotdev/usehooks";

function CanvasActions() {
  const [draftButtonRef, hoveringDraft] = useHover();
  const [exitButtonRef, hoveringExit] = useHover();
  return (
    <div
      className="canvas-actions"
      style={{
        position: "sticky",
        top: "620px",
        height: "180px",
        marginLeft: "2%",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        className="primary-buttons-container"
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Button
          ref={draftButtonRef}
          className="save-as-draft"
          shape="circle"
          size="large"
          icon={
            <RiDraftLine
              style={{
                color: "#ffffff",
                height: "20px",
                width: "20px",
                position: "relative",
                top: "1px",
              }}
            />
          }
          style={{
            backgroundColor: hoveringDraft
              ? "rgba(79, 133, 219, 0.8)"
              : "rgba(79, 133, 219, 1)",
            border: "none",
          }}
        />
        <Button
          className="publish"
          shape="circle"
          size="large"
          icon={
            <MdOutlinePublish
              style={{
                height: "20px",
                width: "20px",
                position: "relative",
                top: "1px",
              }}
            />
          }
          type="primary"
          style={{ border: "none" }}
        />
      </div>
      <Button
        ref={exitButtonRef}
        className="cancel"
        shape="circle"
        size="large"
        type="default"
        style={{
          border: hoveringExit
            ? "2px solid rgba(237,93, 83, 1)"
            : "1px solid #000000",
        }}
        icon={
          <IoExitOutline
            style={{
              height: "20px",
              width: "20px",
              margin: "0px",
              padding: "0px",
              position: "relative",
              top: "1px",
              left: "2px",
              color: hoveringExit ? "rgba(237,93, 83, 1)" : null,
              transition: "color 0.2s ease",
            }}
          />
        }
      ></Button>
    </div>
  );
}

export default CanvasActions;
