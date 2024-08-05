import React from "react";

function SignaturePreview() {
  return (
    <div
      className="signature-preview"
      style={{
        width: "100%",
        height: "50px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontStyle: "italic",
        borderRadius: "8px",
        border: "1px dashed #5b5b5b",
      }}
    >
      Signature Placement
    </div>
  );
}

export default SignaturePreview;
