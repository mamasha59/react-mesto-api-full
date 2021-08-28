import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Header from "./Header";

function Login ({isLoading, name, title, value, handleLogin, headerPath, headerValue}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEnable, setIsEnable] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    function handleEmailChange(e) {
        if (!e.target.validity.valid) {
            setIsEmailValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsEmailValid(true);
        }
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        if (!e.target.validity.valid) {
            setIsPasswordValid(false);
            setIsEnable(false);
        } else {
            setIsEnable(true);
            setIsPasswordValid(true);
        }
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!email || !password) {
            return
        }
        handleLogin(email, password);
    }

    return (
        <>
            <Header>
                <NavLink to={headerPath} className="header__link header__button">{headerValue}</NavLink>
            </Header>
            <section className="auth">
                <form className="auth__container" name={name} onSubmit={handleSubmit}>
                    <h2 className="auth__title">{title}</h2>
                    <fieldset className="auth__fields">
                        <input className={`auth__field auth__email ${!isEmailValid ? 'auth__field_type_error' : ''}`}
                               placeholder="Email"
                               value={email}
                               onChange={handleEmailChange}
                               type="email"
                               required/>
                        <span className={`auth__input-error-message ${!isEmailValid ? 'auth__input-error-message_active' : ''}`}>Введите email</span>
                        <input className="auth__field auth__password"
                               placeholder="Пароль" value={password}
                               onChange={handlePasswordChange}
                               type="password"
                               required
                               minLength="8"/>
                        <span className={`auth__input-error-message ${!isPasswordValid ? 'auth__input-error-message_active' : ''}`}>Введите пароль. Минимум 8 символов</span>
                    </fieldset>
                    <button className={`auth__submitbtn ${!isEnable ? 'auth__submitbtn_disabled' : ''}`}
                            disabled={!isEnable} type="submit"
                            value={value}>{isLoading ? "Подождите..." : value}</button>
                </form>
            </section>
        </>
    );
}

export default Login;