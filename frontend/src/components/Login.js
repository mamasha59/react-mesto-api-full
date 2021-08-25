import React from "react";

import UserEntryForm from "./UserEntryForm";

function Login({ onLogin }) {
  return <UserEntryForm title="Вход" buttonText="Войти" onAuth={onLogin} />;
}

export default Login;
