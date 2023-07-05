import Header from "../header/header";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const [taskState, setTaskState] = useState("");
  const [fetchedTasks, setFetchedTasks] = useState([]);
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/dashboard/fetchposts", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        setFetchedTasks(data.data.data);
      });
  }, []);
  // const [modifyUserInfo, setModifyUserInfo] = useState(false);
  const onUserShowHandler = (props) => {
    setUserInfo(props);
  };
  const LogOutHandler = () => {
    localStorage.removeItem("data");
    navigate("/");
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
    // console.log(taskState);
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
        const { email } = JSON.parse(localStorage.getItem("data"));
        const response = axios
          .post("http://localhost:4000/api/dashboard/fetchposts", {
            email: email,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
          .then((data) => {
            setFetchedTasks(data.data.data);
          });
      }
    }
  };
  const onClearTask = async (_id) => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const data = { email, _id };
    const response = await fetch(
      "http://localhost:4000/api/dashboard/deletetask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      fetchAllTasks();
    }
  };
  const onChangeTaskStatus = async (_id, index) => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const data = { email, _id, index };
    const response = await fetch(
      "http://localhost:4000/api/dashboard/changestatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (response.ok) {
      const changeStatus = document.querySelector("#radioBtn" + index);
      changeStatus.classList.toggle("check");
      const dashed = document.querySelector("#task" + index);
      dashed.classList.toggle("dashed");
    }
  };

  const fetchAllTasks = () => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/dashboard/fetchposts", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        // console.log(data.data.data);
        setFetchedTasks(data.data.data);
      });
  };
  const fetchActiveTasks = async () => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/dashboard/fetchactiveposts", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        // console.log(data);
        setFetchedTasks(data.data.data);
      });
  };
  const fetchCompletedTasks = async () => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/dashboard/fetchcompletedposts", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        console.log(data);
        setFetchedTasks(data.data.data);
      });
  };
  const clearCompletedTasksHandler = () => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/dashboard/clearcompletedtasks", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        fetchAllTasks();
        // setFetchedTasks(data.data.data);
      });
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
        {fetchedTasks.map(function (data, index) {
          return (
            <div className="singleTask" key={index}>
              <div className="radioWithTask">
                <div
                  className={`${
                    data.completed ? "radioBtn check" : "radioBtn"
                  }`}
                  id={"radioBtn" + index}
                  onClick={function () {
                    onChangeTaskStatus(data._id, index);
                  }}
                ></div>
                <div
                  className={`${data.completed ? "task dashed" : "task"}`}
                  id={"task" + index}
                >
                  {data.title}
                </div>
              </div>
              <div
                className="closeTask"
                onClick={function () {
                  onClearTask(data._id);
                }}
              >
                X
              </div>
            </div>
          );
        })}

        <div className="control">
          <div>{fetchedTasks.length} Items left</div>
          <div className="status">
            <span onClick={fetchAllTasks}>All</span>
            <span onClick={fetchActiveTasks}>Active</span>
            <span onClick={fetchCompletedTasks}>Completed</span>
          </div>
          <div onClick={clearCompletedTasksHandler}>Clear Completed</div>
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
