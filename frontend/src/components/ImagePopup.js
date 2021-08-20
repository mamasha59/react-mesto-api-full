import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <figure className={`popup popup_image ${card.isOpen ? 'popup_opened' : ''} `}>
        <div className="card-open">
          <button aria-label="закрыть просмотр" type="button" className="popup__close" onClick={onClose}/>
          <img src={card.link} alt={card.name} className="card-open__screen" />
          <figcaption className="card-open__name" >{card.name}</figcaption>
        </div>
      </figure>
    );
}

export default ImagePopup;