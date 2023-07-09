import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftFrame from "../leftFrame/leftFrame";
import "./signUp.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryActions } from "../../store/store";
import { pageDirActions } from "../../store/store";
const SignUp = () => {
  // useEffect(() => {
  //   document.documentElement.dir = localStorage.getItem("dir");
  //   // const Lan = localStorage.getItem("lan");
  // }, []);

  const pageDirSelector = useSelector((state) => state.changePageDir.pageDir);
  const pageDirDispatch = useDispatch();
  useEffect(() => {
    setPageDir(pageDirSelector);
  }, [pageDirSelector]);

  const [t, i18n] = useTranslation();
  const [pageDir, setPageDir] = useState(true);

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
    return navigate("/");
  };
  return (
    <div className="SignPage">
      <LeftFrame />
      {!pageDir && (
        <span
          className="logInLang"
          onClick={() => {
            // setPageDir(!pageDir);
            pageDirDispatch(pageDirActions.changePageDir(!pageDirSelector));

            i18n.changeLanguage("en");
          }}
        >
          En
        </span>
      )}
      {pageDir && (
        <span
          className="logInLang"
          onClick={() => {
            // setPageDir(!pageDir);
            pageDirDispatch(pageDirActions.changePageDir(!pageDirSelector));

            i18n.changeLanguage("ar");
          }}
        >
          Ar
        </span>
      )}
      {pageDir && (
        <div className="signUp">
          {/* <div className="form"> */}
          <h1>{t("Sign Up")}</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>{t("Email")}</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder={t("Email")}
                required
              />
            </div>
            <div>
              <label>{t("Password")}</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                placeholder={t("Password")}
                required
              />
            </div>
            <div>
              <label>{t("Confirm Password")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("Confirm Password")}
                required
              />
            </div>
            <button
              className="completeSignUp"
              onClick={registerFunc}
              type="submit"
            >
              {t("Complete Signup")}
            </button>
            <div className="alternative">
              <p>{t("Alt2")}</p>
              <button onClick={LogInHandlerAlt}>{t("LogIn")}</button>
            </div>
          </form>
          {/* </div> */}
        </div>
      )}
      {!pageDir && (
        <div className="signUp">
          {/* <div className="form"> */}
          <h1>{t("Sign Up")}</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>{t("Email")}</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder={t("Email")}
                required
              />
            </div>
            <div>
              <label>{t("Password")}</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                placeholder={t("Password")}
                required
              />
            </div>
            <div>
              <label>{t("Confirm Password")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("Confirm Password")}
                required
              />
            </div>
            <button
              className="completeSignUp"
              onClick={registerFunc}
              type="submit"
            >
              {t("CompleteSignUp")}
            </button>
            <div className="alternative">
              <p> {t("Alt2")}</p>
              <button onClick={LogInHandlerAlt}>{t("LogIn")}</button>
            </div>
          </form>
          {/* </div> */}
        </div>
      )}
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
