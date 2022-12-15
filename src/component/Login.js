import React, { useState } from "react";
import "./index.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    console.log("123");
  };
  console.log("password", password);
  return (
    <div className="login-container">
      <div className="title d-flex justify-content-center ">Log in</div>
      <span>Email or userName</span>
      <div class="form-group">
        <input
          type="text"
          placeholder="Email or userName"
          value={email}
          onChange={(e) => {
            handleChangeEmail(e);
          }}
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            handleChangePassword(e);
          }}
        />
      </div>
      <button
        className={`btn__contact-form ${
          email && password.length >= 6 ? "active" : ""
        }`}
        disabled={email && password.length === 6 ? false : true}
        onClick={handleSubmit}
      >
        Login
      </button>
      <div className="back">Go back</div>
    </div>
  );
}

export default Login;
