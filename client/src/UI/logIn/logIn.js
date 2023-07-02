import LeftFrame from "../leftFrame/leftFrame";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./logIn.css";
const LogIn = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(formState);
  };
  // register func
  const logInFunc = async () => {
    const { email, password } = formState;
    const data = { email, password };
    if (email === "" || password === "") {
      console.log("empty fields");
      return;
    } else {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 404 || response.status === 401) {
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
      } else return navigate("/");
    }
  };
  const SignUpHandlerAlt = () => {
    return navigate("/signup");
  };

  return (
    <div className="logInPage">
      {" "}
      <LeftFrame />
      <div className="logIn">
        {/* <div className="form"> */}
        <h1>Log In</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
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
              value={formState.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>

          <button className="logInBtn" onClick={logInFunc}>
            LogIn
          </button>

          <div className="alternative">
            <p>Don't have an account!</p>
            <button onClick={SignUpHandlerAlt}>Sign Up</button>
          </div>
        </form>
        {/* </div> */}
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
  );
};
export default LogIn;
