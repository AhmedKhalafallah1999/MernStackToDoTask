import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from "./UI/header/header";
import Dashboard from "./UI/dashboard/dashboard";
import SignUp from "../src/UI/signUp/signUp";
import CompleteSignUp from "./UI/completeSignUp/completeSign";
import LogIn from "./UI/logIn/logIn";
import ModifyUser from "./UI/modifyUserInfo/ModifyUser";
function App() {
  return (
    <>
      {/* <Router>
          <Routes>
            <Route path="/dashboard" element={<Header />} />
          </Routes>
        </Router> */}
      <div className="App">
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/completesignup" element={<CompleteSignUp />} />
            <Route path="/" element={<LogIn />} />
            <Route path="/modify" element={<ModifyUser />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
