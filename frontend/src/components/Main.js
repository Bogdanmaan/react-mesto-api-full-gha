import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          type="button"
          className="profile__avatar-button"
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__edit-button"
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
