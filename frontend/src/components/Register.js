import React from 'react';
import { withRouter,Link } from 'react-router-dom';
import Header from './Header'
function Register(props) {
    const email = React.useRef();
    const password = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email.current.value,password.current.value)
       //console.log(password.current.value)
    };      
    return (
        <div>
          <Header>
          <Link to="/signin" className="header__link">Войти</Link>
          </Header>
            <main>
                <div className="register">
                    <p className="register__title">Регистрация</p>
                    <form className="register__form" onSubmit={handleSubmit}>

                        <input ref={email} className='register__input' id="userEmail" name="userEmail" type="email" placeholder={'Email'} required />

                        <input ref={password} className='register__input' id="password" name="password" type="password" placeholder={'Пароль'} required/>

                        <div className="register__button-container">
                            <button type="submit" className="register__link">Зарегистрироваться</button>
                            <p className='register__question'>Уже зарегистрированы?
                                <Link to="/signin" className='register__enter' >Войти</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default withRouter(Register);
