import Header from "../header/header";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const onUserShowHandler = (props) => {
    setUserInfo(props);
  };
  const LogOutHandler = () => {
    navigate("./login");
  };
  return (
    <>
      <Header onUserClick={onUserShowHandler} />
      <div className="landingPage"></div>
      <div className="tasks">
        <div className="addTask">
          <form>
            <input type="text" />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="singleTask">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 close"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p>Clean the room</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            className="w-6 h-6 close"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      {userInfo ? (
        <div className="user-info">
          <p>Hi Mohamed</p>
          <button className="modify" type="submit">
            Modify User Info
          </button>
          <form action="/logout" method="POST">
            <button className="logOut" type="submit" onClick={LogOutHandler}>
              LogOut
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Dashboard;
