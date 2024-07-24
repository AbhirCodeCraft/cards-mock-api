import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../modules/ApiHelpers";
import "./styles.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const newMember = { name: name };
    const addedMember = await addItem(newMember);
    onClose(addedMember);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Member</h2>
          <button className="close-button" onClick={() => onClose()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
