import React from "react";
import img from "../Images/work-in-progress.jpg";

const UnderConstruction = () => {
  const underConstructionStyles: React.CSSProperties = {
    textAlign: "center",
    marginTop: "50px",
  };

  const titleStyles: React.CSSProperties = {
    fontSize: "24px",
    color: "#333",
  };

  const messageStyles: React.CSSProperties = {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
  };

  return (
    <div style={underConstructionStyles}>
      <h1 style={titleStyles}>Under Construction</h1>
      <p style={messageStyles}>This page is currently under construction. Please check back later.</p>
      <img src={img} alt="Work in Progress" />
    </div>
  );
};

export default UnderConstruction;
