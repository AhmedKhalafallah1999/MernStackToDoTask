import LeftFrame from "../leftFrame/leftFrame";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { pageDirActions } from "../../store/store";
import { useEffect } from "react";

import "./completeSignUp.css";
const CompleteSignUp = () => {
  // useEffect(() => {
  //   document.documentElement.dir = localStorage.getItem("dir");
  //   // const Lan = localStorage.getItem("lan");
  // }, []);

  const pageDirSelector = useSelector((state) => state.changePageDir.pageDir);
  const pageDirDispatch = useDispatch();
  useEffect(() => {
    setPageDir(pageDirSelector);
  }, [pageDirSelector]);

  const [pageDir, setPageDir] = useState(true);
  const [t, i18n] = useTranslation();

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
          <h1>{t("Complete Signup")}</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>{t("UserName")}</label>
              <input
                type="text"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                placeholder={t("UserName")}
                required
              />
            </div>
            <div>
              <label>{t("Phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                placeholder={t("Phone")}
                required
              />
            </div>
            <div>
              <label>{t("BirthYear")}</label>
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
                {t("Complete Signup")}
              </button>
              <button className="Back">{t("Back")}</button>
            </div>
            <div className="alternative">
              <p>{t("Alt")}</p>
              <button onClick={LogInHandlerAlt}>{t("LogIn")}</button>
            </div>
          </form>
          {/* </div> */}
        </div>
      )}
      {!pageDir && (
        <div className="signUp">
          {/* <div className="form"> */}
          <h1>{t("Complete Signup")}</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>{t("UserName")}</label>
              <input
                type="text"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                placeholder={t("UserName")}
                required
              />
            </div>
            <div>
              <label>{t("Phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                placeholder={t("Phone")}
                required
              />
            </div>
            <div>
              <label>{t("BirthYear")}</label>
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
                {t("CompleteSignUp")}
              </button>
              <button className="Back"> {t("Back")}</button>
            </div>
            <div className="alternative">
              <p>{t("Alt")}</p>
              <button onClick={LogInHandlerAlt}>{t("LogIn")}</button>
            </div>
          </form>
          {/* </div> */}
        </div>
      )}
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
