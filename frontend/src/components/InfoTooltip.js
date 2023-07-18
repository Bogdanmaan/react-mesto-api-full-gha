import React from "react";

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__container-image"
          src={props.popupStatus.image}
          alt="done"
        />
        <h2 className="popup__container-text">{props.popupStatus.text}</h2>
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

export default InfoTooltip;
