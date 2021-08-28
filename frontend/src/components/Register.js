import React from "react";
import {Link} from "react-router-dom";


function Register(props) {

const [data, setData] = React.useState({
  email: '',
  password: ''
});

  function handleSubmit(e) {
    const {email, password} = data;
    e.preventDefault();
    props.onRegister({email, password})
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  return(
  <form onSubmit={handleSubmit} className="popup__form popup__form_login">
    <h3 className="popup__title popup__title_login">Регистрация</h3>
    <label>
      <input id="email" type="email" name="email" value={data.email}
             className="popup__input popup__input_login"
             placeholder="Email" required minLength="2" maxLength="40"
             onChange={handleChange}/>
      <span className="popup__input-error">
            </span>
    </label>
    <label>
      <input id="password" type="password" name="password" value={data.password}
             className="popup__input popup__input_login"
             placeholder="Пароль" required minLength="2" maxLength="10" onChange={handleChange}/>
      <span className="popup__input-error">
            </span>
    </label>
    <button type="submit" className="popup__button popup__button_login">Зарегистрироваться</button>
    <p className="popup__subtitle">Уже зарегистрированы? <Link to='/sign-in' className="link">Войти</Link></p>
  </form>
)
}

export default Register
