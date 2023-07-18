import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(formValue.email, formValue.password);
  };
  return (
    <div className="openscreen">
      <h2 className="openscreen__welcome">Регистрация</h2>
      <form onSubmit={handleSubmit} className="openscreen__form">
        <input
          className="openscreen__form-field"
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="openscreen__form-field"
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <div className="openscreen__button-container">
          <button type="submit" className="openscreen__link">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="openscreen__signin">
        <p className="openscreen__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="openscreen__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
