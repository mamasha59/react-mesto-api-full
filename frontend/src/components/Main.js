import React from 'react';

import editImagePath from '../images/pen.svg';
import addButtonPath from '../images/add_button.svg';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    const { cards, onCardLike, onApproveDelition, onPickDeletedCard, onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;
    const currentUser = React.useContext(CurrentUserContext);

    return(
    <main className="content">
    <section className="profile">
      <div className="profile__avatar" onClick={onEditAvatar}>
        <img src={currentUser.avatar} alt="Фотография профиля" className="profile__photo" />
        <div className="profile__shadow">
          <img src={editImagePath} alt="Перо" className="profile__edit-image" />
        </div>
      </div>
      <div className="profile__info">
        <div className="profile__edition">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" name="editButton" className="profile__button profile__button_edit" onClick={onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>
      <button type="button" name="addButton" className="profile__button profile__button_add" onClick={onAddPlace}><img src={addButtonPath} alt="Кнопка добавления" className="profile__icon" /></button>
    </section>

    <section className="elements">
      {cards.map((el, index) => (
        <Card key={index} card={el} onCardClick={onCardClick} onCardLike={onCardLike} onApproveDelition={onApproveDelition} onPickDeletedCard={onPickDeletedCard} />
      ))}
    </section>
  </main>
  );
}

export default Main;