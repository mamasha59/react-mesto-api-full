import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick () {
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onCardDelete(card);
    }

    return (
            <figure className="elements__element" key={card._id}>
                <div className="elements__picture-group">
                    <img className="elements__photo"
                         src={card.link}
                         alt={card.name}
                         onClick={handleClick}
                    />
                    <button className={`elements__deletebtn ${isOwn ? 'elements__deletebtn' : 'elements__deletebtn_hidden'}`}
                            type="button"
                    onClick={handleDeleteClick}></button>
                </div>
                <figcaption className="elements__figcaption">
                    <h2 className="elements__title">{card.name}</h2>
                    <div className="elements__likebtn-group">
                        <button className={`elements__likebtn ${isLiked ? 'elements__likebtn_active' : 'elements__likebtn'}`}
                                type="button"
                        onClick={handleLikeClick}></button>
                        <span className="elements__counter">{card.likes.length}</span>
                    </div>
                </figcaption>
            </figure>
    );
}

export default Card;