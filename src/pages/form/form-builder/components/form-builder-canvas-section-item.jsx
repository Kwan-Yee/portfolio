import React, { useEffect, useState } from "react";
import {
  MdOutlineExpandMore,
  MdOutlineDelete,
  MdFileCopy,
} from "react-icons/md";
import { FiMove } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { Divider, Input } from "antd";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { useFormBuilderContext } from "../../context-provider";
import SortableComponentIndex from "../form-components/sortable-component-index";

function SortableSectionItem({ sectionId, index }) {
  // console.log("sectionId: ", sectionId);
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: sectionId });

  const [isCollapse, setisCollapse] = useState(true);
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
  }, [allSectionsCollapse]);

  //TODO: this should be called from the children of each section
  const componentsInSection = [
    { type: "static-table", id: `${uuidv4()}_Component` },
    { type: "qna", id: `${uuidv4()}_Component` },
    { type: "dynamic-table", id: `${uuidv4()}_Component` },
    { type: "notes", id: `${uuidv4()}_Component` },
    { type: "signature", id: `${uuidv4()}_Component` },
    { type: "stamp", id: `${uuidv4()}_Component` },
  ];

  return (
    <div
      className="section"
      style={{
        border: "2px solid rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        padding: "8px",
        boxSizing: "border-box",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        transform: CSS.Transform.toString({
          ...transform,
          scaleX: 1,
          scaleY: 1,
        }),
        transition,
      }}
      ref={setNodeRef}
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
        <FiMove style={{ cursor: "move" }} {...attributes} {...listeners} />
      </div>
      {!isSectionCollapsed && (
        <div
          className="section-content"
          style={{
            paddingTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div
            className="section-content-render-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
            >
              <DragOverlay>XXXX</DragOverlay>
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={componentsInSection}
              >
                {componentsInSection.map((component, index) => (
                  <SortableComponentIndex
                    id={component.id}
                    type={component.type}
                    key={index}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(SortableSectionItem);
