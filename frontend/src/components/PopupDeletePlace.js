import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupDeletePlace({ isOpen, onClose, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button={"Удалить"}
    />
  );
}

export default PopupDeletePlace;