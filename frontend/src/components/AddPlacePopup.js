import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose,onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  
  React.useEffect(() => {
    setName('');
    setLink('');
},[isOpen]);

function handleAddCardName(e) {
  setName(e.target.value);
}

function handleAddCardLink(e) {
  setLink(e.target.value);
}

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
  })
  }
  return (
    <PopupWithForm
      name="new-place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button={"Создать"}>
      <input
        className="popup__input popup__input_card-name"
        placeholder="Название"
        type="text"
        name="place"
        value={name}
        onChange={handleAddCardName}
        id="popup__title"
        minLength="2" maxLength="40" required />
        <span className="popup__error popup__title-error"/>
      <input
        className="popup__input popup__input_card-link"
        placeholder="Ссылка"
        type="URL"
        name="source"
        value={link}
        onChange={handleAddCardLink}
        id="popup__link"
        minLength="2" maxLength="200" required />
        <span className="popup__error popup__link-error"/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;