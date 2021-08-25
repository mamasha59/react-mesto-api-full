import React from "react";

import closeIconPath from "../images/close_icon.svg";

function InfoTooltip(props) {
  const { isOpen, onClose, content } = props;

  // Функция для закрытия окна при клике по оверлею
  function handleCloseOverlay(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_register ${isOpen && "popup_opened"}`}
      onClick={handleCloseOverlay}>
      <button
        type="button"
        name="closeButton"
        onClick={onClose}
        className="popup__close-icon popup__close-icon_register">
        <img src={closeIconPath} alt="Закрывающий крестик" className="popup__close-image" />
      </button>
      <div className="popup__container popup__container_register">
        <img
          src={content.img}
          alt="Значок успешной/неуспешной регистрации"
          className="popup__reg-symbol"></img>
        <h2 className="popup__title popup__title_register">{content.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
