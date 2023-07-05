import LeftFrame from "../leftFrame/leftFrame";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./completeSignUp.css";
const CompleteSignUp = () => {
  const DataSelector = useSelector((state) => state.PrimaryData.PrimaryData[0]);
  // console.log(DataSelector);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    phone: "",
    birthday: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  // register func
  const registerFunc = async () => {
    const {
      username,
      phone,
      birthday,
      // indicates whether the form is in login mode or not
    } = formState;
    const data = {
      ...DataSelector,
      username,
      phone,
      birthday,
    };
    // const { email, password, confirmPassword } =  DataSelector ;
    // console.log(data);
    // console.log(email);
    if (username === "" || phone === "" || birthday === "") {
      // console.log("empty fields");
      toast.info("Empty Field, please", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        return navigate("/");
      } else if (response.status === 400) {
        toast.info(`${result.error},`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(function () {
          navigate("/signup");
        }, 3000);
      }
    }
  };
  const LogInHandlerAlt = () => {
    return navigate("/");
  };
  return (
    <div className="comleteSignUp">
      <LeftFrame />
      <div className="signUp">
        {/* <div className="form"> */}
        <h1>Complete SignUp</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
            />
          </div>
          <div>
            <label>Birth Year</label>
            <input
              type="date"
              name="birthday"
              value={formState.birthday}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button className="completeSignUp" onClick={registerFunc}>
              Complete SignUp
            </button>
            <button className="Back">Back</button>
          </div>
          <div className="alternative">
            <p>Already have an account!</p>
            <button onClick={LogInHandlerAlt}>Login</button>
          </div>
        </form>
        {/* </div> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={6000}
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
export default CompleteSignUp;
