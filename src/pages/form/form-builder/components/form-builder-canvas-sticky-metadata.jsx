import { Form, Formik } from "formik";
import React, { useState } from "react";
import MetadataInputRow from "./form-builder-canvas-metadata-input";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useHover } from "@uidotdev/usehooks";

const metadataListEdittable = [
  "Title",
  "Description",
  "Ref. number format",
  "Workflow",
];

const metadataListNonEdittable = [
  "Created By",
  "Created Date",
  "Last Modified By",
  "Last Modified Date",
  "Template Id",
];

import styled from "styled-components";

const StickyMetadataContainer = styled.div`
  position: sticky;
  top: 10px;
  margin-right: 1%;
  width: 16%;
  height: max-content;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ffffff;
  // border: 1px solid rgba(0, 0, 0, 0.4);  // Uncomment if needed
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);  // Uncomment if needed
`;

const MetadataInputContainerEdittable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  // border: 1px solid #5b5b5b;  // Uncomment if needed
  // border-radius: 8px;  // Uncomment if needed
  // padding: 10px;  // Uncomment if needed
`;

const CustomHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #5b5b5b;
  opacity: 40%;
`;

const MetadataInputContainerNonEdittable = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

function StickyMetadata() {
  const [showMetadata, setShowMetadata] = useState(true);
  // const [ref, hovering] = useHover();
  return (
    <StickyMetadataContainer className="sticky-metadata">
      <h4 style={{ margin: "0px 0px 10px 0px" }}>Metadata</h4>
      <Formik>
        <Form noValidate>
          <MetadataInputContainerEdittable className="metadata-input-container-edittable">
            {metadataListEdittable.map((item) => (
              <MetadataInputRow key={item} title={item} />
            ))}
          </MetadataInputContainerEdittable>
          <CustomHr />
          <MetadataInputContainerNonEdittable className="metadata-input-container-non-edittable">
            {showMetadata && (
              <div
                className="metadata-input-container-non-edittable-expanded"
                style={{
                  maxHeight: "max-content",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                {metadataListNonEdittable.map((item) => (
                  <MetadataInputRow key={item} title={item} edittable={false} />
                ))}
              </div>
            )}
            {showMetadata ? (
              <div
                className="collapse-icon"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <FaChevronUp
                  style={{ cursor: "pointer", marginTop: "10px" }}
                  onClick={() => setShowMetadata(false)}
                />
              </div>
            ) : (
              <div
                className="collapse-icon"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <FaChevronDown
                  onClick={() => setShowMetadata(true)}
                  style={{ cursor: "pointer", marginTop: "10px" }}
                />
              </div>
            )}
          </MetadataInputContainerNonEdittable>
        </Form>
      </Formik>
    </StickyMetadataContainer>
  );
}

export default StickyMetadata;
