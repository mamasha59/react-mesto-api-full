import React from "react";
import { Link } from "react-router-dom";

import UserEntryForm from "./UserEntryForm";

function Register({ onRegister }) {
  return (
    <>
      <UserEntryForm title="Регистрация" buttonText="Зарегистрироваться" onAuth={onRegister} />
      <p className="user-entry__paragraph">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="user-entry__paragraph user-entry__paragraph_link">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
