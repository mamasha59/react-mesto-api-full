import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_dark popup-preview ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container-preview">
        <button type="button" className="popup__close-button"
                onClick={props.onClose}>
        </button>
        <img src={props.card ? props.card.link : ''} alt="изображение достопримечательности в России"
             className="popup__image"/>
        <p className="popup__preview-title">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
