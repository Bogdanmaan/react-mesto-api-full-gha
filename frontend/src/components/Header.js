import React from "react";
import logo from "../images/header__logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__menu">
        <p className={`${props.loggedIn ? "header__email" : ""}`}>{props.userEmail}</p>
        <Link
          to={props.way}
          onClick={props.onSignOut}
          className={`header__title ${
            props.loggedIn ? "header__title_gray" : ""
          } `}
        >
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
