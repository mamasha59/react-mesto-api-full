import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onApproveDelition, onPickDeletedCard } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (`article__like-button ${isLiked && 'article__like-button_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleApproveDelete() {
    onApproveDelition();
    onPickDeletedCard(card);
  }

  return (
    <div className="article">
      <img src={card.link} alt={card.name} onClick={handleClick} className="article__image" />
      {isOwn && <button type="button" name="deleteButton" className="article__delete-button article__delete-button_active" onClick={handleApproveDelete}></button>}
      <div className="article__bottom-part">
        <h2 className="article__name">{card.name}</h2>
        <div className="article__like-field">
          <button type="button" name="likeButton" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="article__like-quantity">{card.likes.length}</p>
        </div>         
      </div>
    </div>
  );
}

export default Card;