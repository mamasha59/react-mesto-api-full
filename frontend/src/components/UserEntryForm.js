import { React, useState } from "react";

function UserEntryForm(props) {
  const { title, buttonText, onAuth } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAuth(userData);
  }

  return (
    <section className="user-entry">
      <form onSubmit={handleSubmit}>
        <h2 className="user-entry__title">{title}</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          className="user-entry__input"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={userData.password}
          className="user-entry__input"
          onChange={handleChange}
        />
        <button type="submit" className="user-entry__button">
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default UserEntryForm;
