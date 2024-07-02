import { Button, Tooltip } from "antd";
import React from "react";
import { RiDraftLine } from "react-icons/ri";
import { MdOutlinePublish } from "react-icons/md";
import { BsArrowsCollapse } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { useHover } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

import { useFormBuilderContext } from "../../context-provider";

function CanvasActions() {
  const [draftButtonRef, hoveringDraft] = useHover();
  const [exitButtonRef, hoveringExit] = useHover();
  const [collapseButtonRef, hoveringCollapse] = useHover();

  const navigate = useNavigate();

  const { allSectionCollapse, setAllSectionsCollapse } =
    useFormBuilderContext();
  return (
    <div
      className="canvas-actions"
      style={{
        position: "sticky",
        top: "66%",
        height: "250px",
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
          height: "58%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Tooltip placement="right" title="Collapse Sections">
          <Button
            ref={collapseButtonRef}
            className="collapse-button"
            shape="circle"
            size="large"
            icon={
              <BsArrowsCollapse
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
              backgroundColor: hoveringCollapse
                ? "rgba(79, 133, 219, 0.8)"
                : "rgba(79, 133, 219, 1)",
              border: "none",
            }}
            onClick={() => setAllSectionsCollapse(!allSectionCollapse)}
          />
        </Tooltip>
        <Tooltip placement="right" title="Save as Draft">
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
        </Tooltip>
        <Tooltip placement="right" title="Publish">
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
        </Tooltip>
      </div>
      {/* <Tooltip
        placement="right"
        title="Exit"
      > */}
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
        onClick={() => navigate("/permits")}
      />
      {/* </Tooltip> */}
    </div>
  );
}

export default CanvasActions;
