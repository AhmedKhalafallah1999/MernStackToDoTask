import LeftFrame from "../leftFrame/leftFrame";
import { React, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import pageDirActions form '../../store/store'
// import { useDispatch } from "react-redux";
import { pageDirActions } from "../../store/store";
import "./logIn.css";
const LogIn = () => {
  // useEffect(() => {
  //   document.documentElement.dir = localStorage.getItem("dir");
  //   // const Lan = localStorage.getItem("lan");
  // }, []);

  const pageDirSelector = useSelector((state) => state.changePageDir.pageDir);
  const pageDirDispatch = useDispatch();
  useEffect(() => {
    // const lstorage = localStorage.getItem("lan");
    setPageDir(pageDirSelector);
    // setPageDir(lstorage);
  }, [pageDirSelector]);
  // console.log(pageDirSelector);
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [pageDir, setPageDir] = useState(pageDirSelector);
  // const [pageDir, setPageDir] = useState(pageDirSelector);
  // setPageDir(pageDirSelector);
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
      } else {
        localStorage.setItem("data", JSON.stringify(data));
        return navigate("/dashboard");
      }
    }
  };
  const SignUpHandlerAlt = () => {
    return navigate("/signup");
  };

  return (
    <div className="logInPage">
      {" "}
      <LeftFrame />
      {!pageDir && (
        <span
          className="logInLang"
          onClick={() => {
            pageDirDispatch(pageDirActions.changePageDir(!pageDirSelector));
            // setPageDir(pageDirSelector);
            i18n.changeLanguage("en");
          }}
        >
          En
        </span>
      )}
      {pageDir && (
        <span
          className={!pageDirSelector ? "logInLang specialRTL" : "logInLang"}
          onClick={() => {
            pageDirDispatch(pageDirActions.changePageDir(!pageDirSelector));
            // setPageDir(pageDirSelector);
            // setPageDir(!pageDir);
            i18n.changeLanguage("ar");
            // document.querySelector('.logInLang').classList.add('RTL');
          }}
        >
          Ar
        </span>
      )}
      {pageDir && (
        <div className="logIn">
          {/* <div className="form"> */}
          <h1>{t("Log In")}</h1>
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

            <button className="logInBtn" onClick={logInFunc}>
              {t("LogIn")}
            </button>

            <div className="alternative">
              <p>{t("Alt")}</p>
              <button onClick={SignUpHandlerAlt}>{t("Sign Up")}</button>
            </div>
          </form>
          {/* </div> */}
        </div>
      )}
      {!pageDir && (
        <div className="logIn">
          {/* <div className="form"> */}
          <h1>{t("Log In")}</h1>
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

            <button className="logInBtn" onClick={logInFunc}>
              {t("LogIn")}
            </button>

            <div className="alternative">
              <p>{t("Alt")}</p>
              <button onClick={SignUpHandlerAlt}>{t("Sign Up")}</button>
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
export default LogIn;
