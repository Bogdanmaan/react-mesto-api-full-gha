import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={avatarRef}
        className="edit-form__field"
        id="avalink"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="edit-form__field-error avalink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
