import React from "react";
import { Link, useLocation } from "react-router-dom";

import logoPath from "../images/vector.svg";
import headerMenu from "../images/header_menu.svg";
import closeIcon from "../images/close_icon.svg";

function Header({ userEmail, onLogout }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuLogout() {
    closeMenu();
    onLogout();
  }

  function handleMenuClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      {isMenuOpen && (
        <div className="header__top-part">
          <p className="header__email header__email_top">{userEmail}</p>
          <button
            onClick={handleMenuLogout}
            className="header__auth-link header__auth-link_top-button">
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <img src={logoPath} alt="Логотип" className="logo" />
        {isMenuOpen ? (
          <img
            src={closeIcon}
            alt="Кнопка сворачивания меню"
            onClick={closeMenu}
            className="header__menu header__menu_close"
          />
        ) : (
          <img
            src={headerMenu}
            alt="Кнопка развёртывания меню"
            onClick={handleMenuClick}
            className="header__menu"
          />
        )}
        <div className="header__auth-box">
          {userEmail && <p className="header__email">{userEmail}</p>}
          {location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__auth-link">
              Войти
            </Link>
          )}
          {location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__auth-link">
              Регистрация
            </Link>
          )}
          {location.pathname === "/main" && (
            <button onClick={onLogout} className="header__auth-link header__auth-link_button">
              Выйти
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
