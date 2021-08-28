import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Main ({
                   cards,
                   onEditProfile,
                   onAddPlace,
                   onEditAvatar,
                   onCardClick,
                   onCardDelete,
                   onCardLike,
                   loggedIn,
                   headerValue,
                   userEmail,
                   handleLogout,
                   headerPath,
                   handleBurgerClick,
                   isMobile}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header>
                <ul className="header__nav">
                    <li
                        className={`header__link header__email ${isMobile ? "header__email_hidden" : ""}`}>{userEmail || "email@email.com"}</li>
                    <li><NavLink to={headerPath}
                                 className={`header__link header__button ${isMobile ? "header__button_hidden" : ""}`}
                                 onClick={handleLogout}>{headerValue}</NavLink></li>
                    <li><button className={`header__burger ${loggedIn && isMobile ? "" : "header__burger_hidden"}`}
                                onClick={handleBurgerClick}>
                        <span className="header__line" onClick={handleBurgerClick}></span>
                    </button></li>
                </ul>
            </Header>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-container">
                    <img className="profile__avatar"
                         src={currentUser.avatar}
                         alt={currentUser.name}
                         onClick={onEditAvatar}
                    />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__job">{currentUser.about}</p>
                        <button className="profile__editbtn" type="button"
                                onClick={onEditProfile}
                        ></button>
                    </div>
                    <button className="profile__addbtn" type="button"
                            onClick={onAddPlace}
                    ></button>
                </section>
                <section className="elements">
                    {cards.map((card) => (
                        <Card key={card._id} {...card} card={card}
                              onCardClick={onCardClick}
                              onCardLike={onCardLike}
                              onCardDelete={onCardDelete}/>
                    ))}
                </section>
            </main>
            <Footer />
        </>
        );
}

export default Main;