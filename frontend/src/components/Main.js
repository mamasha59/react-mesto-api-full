import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar"/>
          <button className="profile__avatar-edit"
                  onClick={props.onEditAvatar}>
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button"
                  onClick={props.onEditProfile}>
          </button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button"
                onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="elements root__elements">
        {
          props.cards.map((card, i) => (
            <Card key={card._id} handleCardClick={props.onCardClick}
                  handleCardLike={props.onCardLike} handleCardDelete={props.onCardDelete}
                  card={card}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
