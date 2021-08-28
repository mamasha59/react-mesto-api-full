import React from 'react';
import logo from "../images/logo.svg";

function Header ({handleLogout, userEmail, value, path, handleBurgerClick, loggedIn, isMobile, ...props}) {

    return (
            <header className="header">
                <img className="logo" src={logo} alt="Логотип Mesto Russia" />
                {props.children}
            </header>
    );
}

export default Header;