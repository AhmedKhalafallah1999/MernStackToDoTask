import logo from "./logo.png";
import "./leftFrame.css";
// import { React, useState } from "react";
// import { useTranslation } from "react-i18next";

const leftFrame = () => {
  // const [t, i18n] = useTranslation();

  return (
    <div className="left">
      <img src={logo} alt="logo" />
      <h1>Your Notes</h1>
    </div>
  );
};
export default leftFrame;
