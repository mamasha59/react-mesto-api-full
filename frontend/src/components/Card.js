import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (//---отображение кнопки удалить если твоя карточка
        `card__deleate ${!isOwn ? '' : 'card__delete_style_active'}`
    );

    const cardLikeButtonClassName = ( //---- togle лайка
        `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <div className="card">
            <img src={card.link}  alt={card.name} className="card__img" onClick={handleCardClick}/>
            <button aria-label="удалить" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
            <div className="card__interactive">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__box-like">
                    <button aria-label="лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <div className="card__like-counter">{card.likes.length}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;