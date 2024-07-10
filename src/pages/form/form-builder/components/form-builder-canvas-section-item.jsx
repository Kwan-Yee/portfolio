import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import {
  MdOutlineExpandMore,
  MdOutlineDelete,
  MdFileCopy,
} from "react-icons/md";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { Divider, Input } from "antd";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useFormBuilderContext } from "../../context-provider";
import SortableComponentIndex from "../form-components/sortable-component-index";
import CompAdder from "./form-builder-canvas-comp-adder";

const SortableSectionItem = forwardRef((props, ref) => {
  // console.log("props: ", props);
  const sectionId = props.sectionId;
  const index = props.index;

  //TODO: Change initial collapse back to true when comp adder done
  const [isCollapse, setisCollapse] = useState(false);
  const { sections, setSections, allSectionsCollapse, setAllSectionsCollapse } =
    useFormBuilderContext();
  const [sectionHeader, setSectionHeader] = useState(
    localStorage.getItem(sectionId)
      ? JSON.parse(localStorage.getItem(sectionId)).title
      : null
  );

  const currSection = JSON.parse(localStorage.getItem(sectionId));
  // console.log("currSection: ", currSection);

  const handleSectionDelete = () => {
    // console.log("sectionId to delete: ", sectionId);
    if (sections.length <= 1) return;
    setSections((prev) => {
      const newSections = [...prev];
      const oldSections = newSections.splice(index, 1);
      localStorage.setItem("sections", JSON.stringify(newSections));
      oldSections.forEach((id) => localStorage.removeItem(id));
      return newSections;
    });
  };

  const handleSectionCopy = () => {
    // console.log("sectionId to copy: ", sectionId);

    //copying section
    const copiedSection = JSON.parse(localStorage.getItem(sectionId));

    //replace the ids of children with new ids
    copiedSection.children.map((child) => {
      const newChildId = `${uuidv4()}_Comp`;
      child.id = newChildId;
      return copiedSection;
    });
    console.log("updatedChildren: ", copiedSection);

    // update copied section Id
    const updatedCopy = { ...copiedSection, id: `${uuidv4()}_Section` };

    //look for the index of the section
    const idx = sections.findIndex((id) => id === sectionId);

    //splice the updatedCopy into section and save to both local storage and context
    setSections((prev) => {
      const newSections = [...prev];
      // console.log(newSections);

      newSections.splice(idx + 1, 0, updatedCopy.id);
      localStorage.setItem("sections", JSON.stringify(newSections));
      localStorage.setItem(updatedCopy.id, JSON.stringify(updatedCopy));

      return newSections;
    });
  };

  let isSectionCollapsed = false;
  if (allSectionsCollapse) isSectionCollapsed = true;
  if (isCollapse) isSectionCollapsed = true;

  useEffect(() => {
    if (allSectionsCollapse) setisCollapse(true);
    return;
  }, [allSectionsCollapse]);

  const [compsToRender, setCompsToRender] = useState(
    localStorage.getItem(sectionId)
      ? JSON.parse(localStorage.getItem(sectionId)).children
      : []
  );

  useImperativeHandle(ref, () => ({
    setCompsToRender,
  }));

  const handleSectionMovement = (direction) => {
    if (direction === "up") {
      if (index === 0) return;
      setSections((prev) => {
        const newSections = [...prev];
        newSections.splice(index - 1, 0, newSections.splice(index, 1)[0]);
        localStorage.setItem("sections", JSON.stringify(newSections));
        return newSections;
      });
    } else if (direction === "down") {
      if (index === sections.length - 1) return;
      setSections((prev) => {
        const newSections = [...prev];
        newSections.splice(index + 1, 0, newSections.splice(index, 1)[0]);
        localStorage.setItem("sections", JSON.stringify(newSections));
        return newSections;
      });
    }
  };

  return (
    <div
      className="section"
      style={{
        border: "2px solid rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        padding: "8px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        className="section-header"
        style={{
          borderBottom: !isSectionCollapsed
            ? "1px solid rgba(0, 0, 0, 0.4)"
            : "none",
          paddingBottom: "8px",
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MdOutlineExpandMore
          style={{
            rotate: !isSectionCollapsed ? "0deg" : "-90deg",
            cursor: "pointer",
          }}
          onClick={() => {
            setisCollapse(!isCollapse);
            setAllSectionsCollapse(false);
          }}
        />
        <div>{`${index + 1}.`}</div>
        <Input
          placeholder="Section Header"
          id={sectionId}
          size="large"
          maxLength={200}
          allowClear
          value={sectionHeader}
          onChange={(e) =>
            setSectionHeader(() => {
              localStorage.setItem(
                sectionId,
                JSON.stringify({ ...currSection, title: e.target.value })
              );
              return e.target.value;
            })
          }
        />
        <MdFileCopy
          style={{ cursor: "pointer", fontSize: "14px" }}
          onClick={handleSectionCopy}
        />
        <MdOutlineDelete
          // ref={ref}
          style={{
            cursor: "pointer",
            // color: hovering ? "red" : "none", TODO: to forward ref
          }}
          onClick={handleSectionDelete}
        />
        <Divider type="vertical" style={{ margin: "0px 4px" }} />
        {/* <FiMove style={{ cursor: "move" }} {...attributes} {...listeners} /> */}
        <IoMdArrowRoundUp
          style={{ cursor: "pointer" }}
          onClick={() => handleSectionMovement("up")}
        />
        <IoMdArrowRoundDown
          style={{ cursor: "pointer" }}
          onClick={() => handleSectionMovement("down")}
        />
      </div>
      {!isSectionCollapsed && (
        <div
          className="section-content"
          style={{
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={compsToRender}
          >
            <div
              className="rendered-components"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {compsToRender.length > 0 &&
                compsToRender.map((component, index) => (
                  <SortableComponentIndex
                    id={component.id}
                    type={component.type}
                    index={index}
                    key={index}
                    parent={sectionId}
                  />
                ))}
            </div>
            <CompAdder
              setCompsToRender={setCompsToRender}
              parentSection={sectionId}
            />
          </SortableContext>
        </div>
      )}
    </div>
  );
});

export default React.memo(SortableSectionItem);
