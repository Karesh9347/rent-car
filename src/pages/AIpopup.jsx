import React from "react";
import "../css/aipopup.css";

const AIPopup = ({ show, onHide }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onHide}>&times;</span>
        <h2>AI Recommendation</h2>
        <p>AI can analyze your needs and suggest if this car is the best choice for you.</p>
      </div>
    </div>
  );
};

export default AIPopup;
