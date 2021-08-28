import React from 'react';
import {NavLink} from "react-router-dom";
import logo from "../images/logo.svg";

function BurgerMenu ({isOpened, onClose, userEmail, loggedIn, handleLogout}) {

    return (
        <section className={`burger ${isOpened && loggedIn ? 'burger_opened' : ''}`}>
            <ul className="burger__nav">
                <li className="burger__nav-link">{userEmail || "email@email.com"}</li>
                <li><NavLink to="/sign-up" className="burger__nav-link" onClick={handleLogout}>Выйти</NavLink></li>
            </ul>
            <div className="burger__logo-group">
                <img className="logo burger__logo" src={logo} alt="Логотип Mesto Russia" />
                <button className="burger__closebtn" type="button" onClick={onClose}></button>
            </div>

        </section>
    );
}

export default BurgerMenu;