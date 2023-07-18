import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_photo ${props.card.link ? "popup_opened" : ""}`}
      id="photo-popup"
    >
      <div className="popup__container popup__container_photo">
        <button
          onClick={props.onClose}
          type="button"
          id="photo-close"
          className="popup__close-icon"
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.link}
        />
        <h3 className="popup__title">{props.card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;
