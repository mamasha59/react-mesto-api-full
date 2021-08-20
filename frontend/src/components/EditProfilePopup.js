import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser,button }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      button={"Сохранить"}>
        
      <input
        className="popup__input popup__input_user-name"
        placeholder="Имя"
        type="text"
        name="name"
        value={name || ''}
        onChange={handleChangeName}
        id="popup__name"
        minLength="2" maxLength="40" required />
      <span className="popup__error popup__name-error" />
      <input
        className="popup__input popup__input_user-profession"
        placeholder="Род занятий"
        type="text"
        name="about"
        value={description || ''}
        onChange={handleChangeAbout}
        id="popup__about"
        minLength="2" maxLength="200" required />
      <span className="popup__error popup__about-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;