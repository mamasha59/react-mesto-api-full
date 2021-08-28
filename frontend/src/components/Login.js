import React from "react";

function Login(props) {

  function handleChange(e) {
    const {name, value} = e.target;
    props.onEnter({
      ...props.data,
      [name]: value
    })
  }

  function handleSubmit(e) {
    const {email, password} = props.data;
    e.preventDefault();
    props.onAutorization({email, password})
  }

  return (
    <form className="popup__form popup__form_login" onSubmit={handleSubmit}>
      <h3 className="popup__title popup__title_login">Вход</h3>
      <label>
        <input id="email" type="email" name="email" value={props.data.email}
               className="popup__input popup__input_login"
               placeholder="Email" required minLength="2" maxLength="40"
               pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})" onChange={handleChange}/>
        <span className="popup__input-error">
            </span>
      </label>
      <label>
        <input id="password" type="password" name="password" value={props.data.password}
               className="popup__input popup__input_login"
               placeholder="Пароль" required minLength="2" maxLength="10" onChange={handleChange}/>
        <span className="popup__input-error">
            </span>
      </label>
      <button type="submit" className="popup__button popup__button_login">Войти</button>
      <p className="popup__subtitle"></p>
    </form>
  )
}

export default Login
