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
          </form>
        </div>

        <div className="singleTask first">
          <div className="radioWithTask">
            <div className="radioBtn"></div>
            <div className="task">Clean the room</div>
          </div>
          <div className="closeTask">X</div>
        </div>
        <div className="singleTask">
          <div className="radioWithTask">
            <div className="radioBtn"></div>
            <div className="task">Clean the room</div>
          </div>
          <div className="closeTask">X</div>
        </div>
        <div className="singleTask">
          <div className="radioWithTask">
            <div className="radioBtn"></div>
            <div className="task">Clean the room</div>
          </div>
          <div className="closeTask">X</div>
        </div>
        <div className="singleTask">
          <div className="radioWithTask">
            <div className="radioBtn"></div>
            <div className="task">Clean the room</div>
          </div>
          <div className="closeTask">X</div>
        </div>
        <div className="control">
          <div>5 Items left</div>
          <div className="status">
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
          </div>
          <div>Clear Completed</div>
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
