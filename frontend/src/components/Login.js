import React from "react";

function Login(props) {
  React.useEffect(() => {
    setFormValue({ email: "", password: "" });
  }, []);

  const [formValue, setFormValue] = React.useState({
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    props.onLogin(formValue.email, formValue.password);
  };
  return (
    <div className="openscreen">
      <h2 className="openscreen__welcome">Вход</h2>
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
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
