import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

import done from "../images/Union.svg";
import negative from "../images/Negative.svg";

import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isCheckPopupOpen, setIsCheckPopupOpen] = React.useState(false);
  const [popupStatus, setPopupStatus] = React.useState({});
  const [email, setEmail] = React.useState("");
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    api
      .getProfileData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .checkToken(token)
          .then((res) => {
            if (res) {
              const userEmail = res.email;
              handleLogin();
              setEmail(userEmail);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i == currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c == card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c == card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api
      .deleteCard(card._id, isOwn)
      .then(() => {
        setCards((state) => state.filter((item) => item.id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCheckPopupOpen(false);
    setSelectedCard({});
  }

  function handleCheckOpenPopup() {
    setIsCheckPopupOpen(true);
  }

  function handlePopupStatus(text, image) {
    setPopupStatus(text, image);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(name, about) {
    api
      .editProfData(name, about)
      .then((name, about) => {
        setCurrentUser(name, about);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        handleCheckOpenPopup();
        handlePopupStatus({
          text: "Вы успешно зарегистрировались!",
          image: done,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        handleCheckOpenPopup();
        handlePopupStatus({
          text: " Что-то пошло не так! Попробуйте ещё раз.",
          image: negative,
        });
      });
  }

  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        handleCheckOpenPopup();
        handlePopupStatus({
          text: " Что-то пошло не так! Попробуйте ещё раз.",
          image: negative,
        });
      });
  }

  function onSignOut() {
    localStorage.removeItem("token");
    <Navigate to="/sign-in" replace />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProtectedRouteElement
                  element={Header}
                  userEmail={email}
                  way="/sign-in"
                  text="Выйти"
                  onSignOut={onSignOut}
                  loggedIn={loggedIn}
                />

                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header way="/sign-in" text="Войти" />
                <Register onRegister={onRegister} />
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Header way="/sign-up" text="Регистрация" />
                <Login handleLogin={handleLogin} onLogin={onLogin} />
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="dlt"
        onClose={closeAllPopups}
        buttonText="Да"
      />

      <InfoTooltip
        isOpen={isCheckPopupOpen}
        onClose={closeAllPopups}
        popupStatus={popupStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
