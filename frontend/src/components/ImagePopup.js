import React from 'react';

function ImagePopup ({card, name, isOpened, onClose}) {

    return (
        <section className={`popup popup_${name} ${isOpened ? 'popup_opened' : ''}`}>
            <figure className="popup__photo-container">
                <button className="popup__closebtn" type="button" onClick={onClose}></button>
                <img className="popup__wide-photo" alt={card.name} src={card.link} />
                <figcaption className="popup__figcaption">{card.name}</figcaption>
            </figure>
        </section>
    );
    }


export default ImagePopup;