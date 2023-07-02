import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftFrame from "../leftFrame/leftFrame";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { PrimaryActions } from "../../store/store";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const PrimaryDispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  // register func
  const registerFunc = () => {
    const { email, password, confirmPassword } = formState;
    const data = { email, password, confirmPassword };
    if (email === "" || password === "" || confirmPassword === "") {
      console.log("empty fields");
      toast.info("Please, enter vaild information!", {
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
      // fetch("http://localhost:4000/api/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //     navigate("/completesignup");
      //   })
      //   .catch((error) => console.log("there an error happen"));
      PrimaryDispatch(PrimaryActions.addPrimayData(data));
      navigate("/completesignup");
    }
  };
  const LogInHandlerAlt = () => {
    return navigate("/login");
  };
  return (
    <div className="SignPage">
      <LeftFrame />
      <div className="signUp">
        {/* <div className="form"> */}
        <h1>SignUp</h1>
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
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            className="completeSignUp"
            onClick={registerFunc}
            type="submit"
          >
            Complete SignUp
          </button>
          <div className="alternative">
            <p>Already have an account</p>
            <button onClick={LogInHandlerAlt}>Login</button>
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
export default SignUp;
