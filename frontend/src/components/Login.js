import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'
function Login(props) {
    const emailInput = React.useRef();
    const passwordInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onEnter(passwordInput.current.value, emailInput.current.value)
    };
    return (
        <>
            <Header>
                <Link to="/signup" className="header__link">Регистрация</Link>
            </Header>
            <main>
                <div className="login">
                    <p className="login__welcome">Вход</p>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input ref={emailInput} className='login__input login__input_email' id="email" autocomplete="off" required name="email" type="text" placeholder={'Email'} />
                        <input ref={passwordInput} className='login__input login__input_password' id="password" autocomplete="off" required name="password" type="password" placeholder={'Пароль'} />
                        <div className="login__button">
                            <button type="submit" className="login__link">Войти</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}


export default Login;