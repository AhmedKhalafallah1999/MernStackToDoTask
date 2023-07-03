import Header from "../header/header";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const [taskState, setTaskState] = useState("");
  // const [modifyUserInfo, setModifyUserInfo] = useState(false);
  const onUserShowHandler = (props) => {
    setUserInfo(props);
  };
  const LogOutHandler = () => {
    localStorage.removeItem("data");
    navigate("./login");
  };
  const modifyUserINfoHandler = () => {
    navigate("/modify");
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskState((prevState) => ({ ...prevState, [name]: value }));
  };
  const submitTaskHandler = async () => {
    const { email, password } = JSON.parse(localStorage.getItem("data"));
    const data = { email, password, taskState };
    console.log(taskState);
    if (taskState === "") {
      toast.info("Empty Field", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    } else {
      const response = await fetch("http://localhost:4000/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // console.log("DDD", result);
      if (response.status === 400 || response.status === 401) {
        toast.info(`${result.message}`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        document.getElementById("taskInput").value = "";
        setTaskState("");
      }
    }
  };
  return (
    <>
      <Header onUserClick={onUserShowHandler} />
      <div className="landingPage"></div>
      <div className="tasks">
        <div className="addTask">
          <input
            id="taskInput"
            type="text"
            name="text"
            // value={taskState}
            onChange={handleInputChange}
            placeholder="Type your task here,"
            required
          />
          <span className="addToDB" onClick={submitTaskHandler}>
            +
          </span>
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      {userInfo ? (
        <div className="user-info landingBlack">
          <p>Hi Mohamed</p>
          <button
            className="modify"
            type="submit"
            onClick={modifyUserINfoHandler}
          >
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
