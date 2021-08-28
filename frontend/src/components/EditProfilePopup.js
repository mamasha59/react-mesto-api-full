import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

// Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="user" title="Редактировать профиль" isEditProfilePopupOpen={props.isOpen}
                   closeAllPopups={props.onClose} onSubmit={handleSubmit}>
      <label>
        <input id="user-input" type="text" name="name" value={name} onChange={handleChangeName}
               className="popup__input popup__input-name"
               placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="popup__input-error user-input-error">
            </span>
      </label>
      <label>
        <input id="job-input" type="text" name="profession" value={description} onChange={handleChangeDescription}
               className="popup__input popup__input-job"
               placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className="popup__input-error job-input-error">
            </span>
      </label>
      <button type="submit" className="popup__button" onClick={props.onClose}>Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup
