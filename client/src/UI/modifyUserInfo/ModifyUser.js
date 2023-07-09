import "./ModifyUser.css";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { React, useState, useEffect } from "react";
import axios from "axios";
// import Dashboard from "../dashboard/dashboard";
const ModifyUser = () => {
  // useEffect(() => {
  //   document.documentElement.dir = localStorage.getItem("dir");
  //   // const Lan = localStorage.getItem("lan");
  // }, []);

  const ThemeSelector = useSelector((state) => state.Theme.theme);
  if (ThemeSelector) {
    document.getElementsByTagName("BODY")[0].classList.add("darkColor");
  } else {
    document.getElementsByTagName("BODY")[0].classList.remove("darkColor");
  }

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [formState, setFormState] = useState({
    oldEmail: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    birthday: "",
  });
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("data"));
    const response = axios
      .post("http://localhost:4000/api/modify", {
        email: email,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        // console.log(data.data.data[0]);
        const user = data.data.data[0];
        const email = user.email;
        const password = user.password;
        const username = user.username;
        const phone = user.phone;
        const birthday = user.birthday;
        setEmail(email);
        setPassword(password);
        setUserName(username);
        setBirthDay(birthday);
        setPhone(phone);
        const { email: oldEmail } = JSON.parse(localStorage.getItem("data"));
        setFormState({
          oldEmail: oldEmail,
          email: email,
          password: password,
          username: username,
          phone: phone,
          birthday: birthday,
        });

        // setFetchedTasks(data.data.data);
        // console.log(formState);
      });
  }, []);
  // console.log(formState);

  const onUserShowHandler = (props) => {
    setUserInfo(props);
  };
  const DashboardHandler = () => {
    navigate("/dashboard");
  };
  const LogOutHandler = () => {
    localStorage.removeItem("data");
    navigate("/");
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    // console.log(formState);
  };
  const SaveUpdatedUserDataInfo = () => {
    const response = axios
      .patch("http://localhost:4000/api/modifyinfoandupdate", {
        newData: formState,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((data) => {
        localStorage.setItem("data", JSON.stringify({ email: data.data.data }));
        console.log(data);
      });
  };
  return (
    <>
      {/* <div className="modifyPage"> */}
      <Header onUserClick={onUserShowHandler} />
      <div className="landingPage"></div>

      {/* <img src="." alt="cover" /> */}
      <div
        className={ThemeSelector ? "modifyBackage darkButton" : "modifyBackage"}
      >
        <div className="modifyTitle">
          <h1>Modify User Information</h1>
        </div>
        <div className="modify">
          <form>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                defaultValue={email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                defaultValue={password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />{" "}
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                defaultValue={username}
                onChange={handleInputChange}
                placeholder="username"
                required
              />{" "}
            </div>
            <div>
              <label>Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                defaultValue={phone}
                onChange={handleInputChange}
                placeholder="phone"
                required
              />
            </div>
            <div>
              <label>Birth Year</label>
              <input
                type="date"
                name="birthday"
                defaultValue={birthday}
                onChange={handleInputChange}
                placeholder="Birthday"
                required
              />{" "}
            </div>
          </form>
        </div>

        <div className="saveChange">
          <button onClick={SaveUpdatedUserDataInfo}>Save Changes</button>
        </div>
      </div>
      {/* </div> */}
      {userInfo ? (
        <div
          className={
            ThemeSelector
              ? "user-info landingBlack darkThemeInfo"
              : "user-info landingBlack"
          }
        >
          <p>{"Hi " + username}</p>
          <button className="modify" type="submit" onClick={DashboardHandler}>
            Your DashBoard
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
export default ModifyUser;
