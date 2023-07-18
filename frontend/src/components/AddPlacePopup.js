import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const titleRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title: titleRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        ref={titleRef}
        className="edit-form__field"
        id="title"
        name="title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="edit-form__field-error title-error"></span>
      <input
        type="url"
        ref={linkRef}
        className="edit-form__field"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="edit-form__field-error link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
