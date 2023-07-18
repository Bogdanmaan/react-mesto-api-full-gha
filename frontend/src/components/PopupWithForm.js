import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={`${props.name}-popup`}
    >
      <div className="popup__container">
        <form
          name={`${props.name}`}
          className="edit-form"
          onSubmit={props.onSubmit}
        >
          <h2 className="edit-form__heading">{props.title}</h2>
          {props.children}
          <button type="submit" className="edit-form__button">
            {props.buttonText}
          </button>
        </form>
        <button
          onClick={props.onClose}
          type="button"
          id="close"
          className="popup__close-icon"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
