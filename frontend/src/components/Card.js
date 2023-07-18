import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        className="element__mask-group"
        alt={props.card.name}
        src={props.card.link}
      />
      <div className="element__group">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-group">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          type="button"
          className="element__delete"
        />
      )}
    </div>
  );
}

export default Card;
