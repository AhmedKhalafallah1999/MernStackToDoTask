import "./header.css";
import React from "react";
import { useState } from "react";
const Header = (props) => {
  const [onClickState, setOnClick] = useState(false);
  const userInfoSliderHandler = () => {
    setOnClick(!onClickState);
    props.onUserClick(!onClickState);
  };
  return (
    <div className="header">
      <div className="left-section">
        <img className="logo-header" src="./logoRed.png" alt="logo" />
        <h1 className="logo-header">Your Notes</h1>
      </div>
      <div className="right-section">
        <h3>Ar</h3>
        <img src="./Combined Shape.png" alt="moon" />
        <img src="./user.png" alt="user" onClick={userInfoSliderHandler} />
      </div>
    </div>
  );
};
export default Header;
