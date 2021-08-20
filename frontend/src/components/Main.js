import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick,cards,onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <button style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__edit-button" onClick={onEditAvatar}>
          </button>
          <div className="profile__text">
            <div className="profile__title-button">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button aria-label="редактировать" type="button" className="profile__link" onClick={onEditProfile} />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button aria-label="добавить" type="button" className="profile__add" onClick={onAddPlace} />
      </section>
      <section className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          )
          )}
      </section>
    </main>
  );
}

export default Main;