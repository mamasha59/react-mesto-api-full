import React from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isLinkValid, setIsLinkValid] = React.useState(true);
  const [nameError, setNameError] = React.useState("");
  const [linkError, setLinkError] = React.useState("");

  const [buttonText, setButtonText] = React.useState("Создать");
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    resetButtonText();
    resetInput();
  }, [isOpen]);

  // Функции для передачи данных стейт-переменным и для валидации
  function handleNameChange(e) {
    setName(e.target.value);
    setIsNameValid(e.target.validity.valid);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
      setIsFormValid(false);
    } else if (link && isLinkValid) {
      setIsFormValid(true);
    }
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setIsLinkValid(e.target.validity.valid);
    if (!e.target.validity.valid) {
      setLinkError(e.target.validationMessage);
      setIsFormValid(false);
    } else if (name && isNameValid) {
      setIsFormValid(true);
    }
  }

  // Функции для изменения текста на кнопке отправки
  function changeButtonText() {
    setButtonText("Сохранение...");
  }

  function resetButtonText() {
    setButtonText("Создать");
  }

  // Функция для сброса полей формы
  function resetInput() {
    setName("");
    setLink("");
  }

  // Обработчик отправки данных
  function handleSubmit(e) {
    e.preventDefault();
    changeButtonText();
    setIsFormValid(false);

    onAddPlace({
      name: name,
      link: link,
    });
  }

  // Функция для закрытия окна
  function closePopup() {
    onClose();
    resetInput();
    setIsNameValid(true);
    setIsLinkValid(true);
    setIsFormValid(false);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="addition"
      onClose={closePopup}
      title="Новое место"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>
      <input
        id="place-input"
        value={name}
        onChange={handleNameChange}
        required
        type="text"
        name="name"
        placeholder="Название места"
        minLength="2"
        maxLength="30"
        className={`popup__text ${isNameValid === false && "popup__text_type_error"}`}
      />
      <span className={`popup__text-error ${isNameValid === false && "popup__text-error_visible"}`}>
        {nameError}
      </span>
      <input
        id="link-input"
        value={link}
        onChange={handleLinkChange}
        required
        type="url"
        name="link"
        pattern="https?:\/\/(www\.)?([\w\-]{1,}\.)([\w\.~:\/\?#\[\]@!\$&'\(\)\*\+,;=\-]{2,})#?"
        placeholder="Ссылка на изображение"
        className={`popup__text ${isLinkValid === false && "popup__text_type_error"}`}
      />
      <span className={`popup__text-error ${isLinkValid === false && "popup__text-error_visible"}`}>
        {linkError}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
