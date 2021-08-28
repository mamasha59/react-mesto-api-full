import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: title,
      link: link,
    });

    setTitle('');
    setLink('');
  }

  return (
    <PopupWithForm name="place" title="Новое место" isAddPlacePopupOpen={props.isOpen}
                   closeAllPopups={props.onClose} onSubmit={handleSubmit}>
      <label>
        <input id="place-input" type="text" name="place-title" value={title} onChange={handleChangeTitle}
               className="popup__input popup__input_small popup__input-place-title"
               placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__input-error place-input-error">
        </span>
      </label>
      <label>
        <input id="link-input" type="url" name="image" value={link} onChange={handleChangeLink}
               className="popup__input popup__input_small popup__input-image"
               placeholder="Ссылка на картинку" required pattern="https?://.+"/>
        <span className="popup__input-error link-input-error">
        </span>
      </label>
      <button type="submit" className="popup__button popup__button_small popup__button-place"
              onClick={props.onClose}>Создать
      </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup
