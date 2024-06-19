import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({ text, onSave, onCancel, onDelete, adding }) => {
  const [cardText, setCardText] = useState(text || "");

  const handleChangeText = (e) => setCardText(e.target.value);

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(cardText);
    }
  };

  return (
    <div className="edit-card">
      <div className="card relative cursor-pointer bg-white m-2 rounded-lg border border-gray-300 shadow-sm text-base break-words">
        <TextareaAutosize
          autoFocus
          className="px-2 py-2 w-full border-none resize-none outline-none text-base"
          placeholder="Enter the text for this card..."
          value={cardText}
          onChange={handleChangeText}
          onKeyDown={handleEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(cardText)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
        cardText={cardText}
      />
    </div>
  );
};

export default CardEditor;
