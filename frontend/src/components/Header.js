import React from "react";
import logo from '../images/logo.svg';
import {Link, Route} from "react-router-dom";


function Header(props) {

  return (
    <header className="header root__header">
      <img src={logo} alt="логотип сайта" className="header__logo"/>
      <Route exact path='/'>
        <div className="header__group">
          <p className="header__email">{props.email}</p>
          <button className="header__button" onClick={props.onLogOut}>Выйти</button>
        </div>
      </Route>
      <Route path='/signup'>
        <Link className='header__auth-link' to='signin'>Войти</Link>
      </Route>
      <Route path='/signin'>
        <Link className='header__auth-link' to='signup'>Регистрация</Link>
      </Route>
    </header>
  );
}

export default Header;

