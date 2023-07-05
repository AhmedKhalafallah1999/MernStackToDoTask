import "./ModifyUser.css";
import { React, useState, useEffect } from "react";
import axios from "axios";
const ModifyUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthDay] = useState("");
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
        console.log(data.data.data[0]);
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
       // setFetchedTasks(data.data.data);
      });
  }, []);

  return (
    <div className="modifyPage">
      {/* <img src="." alt="cover" /> */}
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
              value={email}
              // onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              // onChange={handleInputChange}
              placeholder="Password"
              required
            />{" "}
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              // onChange={handleInputChange}
              placeholder="username"
              required
            />{" "}
          </div>
          <div>
            <label>Phone</label>
            <input
              id="phone"
              type="tel"
              name="text"
              value={phone}
              // onChange={handleInputChange}
              placeholder="phone"
              required
            />
          </div>
          <div>
            <label>Birth Year</label>
            <input
              type="date"
              name="birthday"
              value={birthday}
              // onChange={handleInputChange}
              required
            />{" "}
          </div>
        </form>
      </div>
      <div className="saveChange">
        <button>Save Changes</button>
      </div>
    </div>
  );
};
export default ModifyUser;
