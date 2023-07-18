import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState({});
  const [description, setDescription] = React.useState({});

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        onChange={handleChangeName}
        className="edit-form__field"
        id="name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="edit-form__field-error name-error"></span>
      <input
        type="text"
        onChange={handleChangeDescription}
        value={description}
        className="edit-form__field"
        id="about"
        name="about"
        placeholder="Работа"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="edit-form__field-error about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
