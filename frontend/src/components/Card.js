import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

  function handleClick() {
    props.handleCardClick(props.card);
  }

  function handleLikeClick() {
    props.handleCardLike(props.card);
  }

  function handleCardDelete() {
    props.handleCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__button-delite ${isOwn ? 'elements__button-delite' : 'elements__button-delite_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__button-like ${isLiked ? 'elements__button-like_black' : 'elements__button-like'}`
  );

  return (
    (
      <div className="elements__item">
        <img src={props.card.link} className="elements__image" alt="место в России" onClick={handleClick}/>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}>
        </button>
        <div className="elements__name">
          <h2 className="elements__title">{props.card.name}</h2>
          <div className="elements__group">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
            </button>
            <p className="elements__counter">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    )
  )
}

export default Card
