import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
            <a className="header__logo-link" href="/#" target="_self">
                <img className="header__logo" src={logo} alt="Логотип" />
            </a>
            <Route exact path="/">
                <button className={`${props.hamburgerStatus ? "header__hamburger-button_active" : "header__hamburger-button"}`} onClick={props.onHamburgerMenuClick} type="button" ></button>
            </Route>

            <Route path="/signin">
                <Link className="header__auth-link button" to="/signup">
                    Регистрация
                </Link>
            </Route>
            <Route path="/signup">
                <Link className="header__auth-link button" to="/signin">
                    Войти
                </Link>
            </Route>
            <Route exact path="/">
                <p className="header__auth-email">{props.email}</p>
                <button
                    className="header__auth-sign-out-button button"
                    onClick={props.onSignOut}>Выйти</button>
            </Route>
        </header>
    );
}

export default Header;
