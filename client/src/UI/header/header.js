import "./header.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const Header = (props) => {
  const pageDirHandler = (state) => {
    props.onPageDirection(state);
  };
  const [pageDirection, setPageDir] = useState(true);
  const [t, i18n] = useTranslation();
  const [onClickState, setOnClick] = useState(false);
  const userInfoSliderHandler = () => {
    setOnClick(!onClickState);
    props.onUserClick(!onClickState);
  };
  return (
    <div className="header">
      <div className="left-section">
        <img className="logo-header" src="./logoRed.png" alt="logo" />
        <h1 className="logo-header">{t("title")}</h1>
      </div>
      <div className="right-section">
        {!pageDirection && (
          <h3
            className="toggle-language"
            onClick={() => {
              i18n.changeLanguage("en");
              setPageDir(!pageDirection);
              pageDirHandler(pageDirection);
            }}
          >
            En
          </h3>
        )}
        {pageDirection && (
          <h3
            className="toggle-language"
            onClick={() => {
              i18n.changeLanguage("ar");
              setPageDir(!pageDirection);
              pageDirHandler(pageDirection);
            }}
          >
            Ar
          </h3>
        )}
        <img src="./Combined Shape.png" alt="moon" />
        <img src="./user.png" alt="user" onClick={userInfoSliderHandler} />
      </div>
    </div>
  );
};
export default Header;
