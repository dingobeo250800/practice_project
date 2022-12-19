import React, { useContext, useEffect, useState } from "react";
import { loginUser } from "../service/UserService";
import "./index.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UseContext";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (email !== "eve.holt@reqres.in") {
      toast.error("chưa nhập đúng mail");
      return;
    }
    const res = await loginUser(email, password);
    if (res && res.token) {
      login(email, res.token);
      toast.success("đăng nhập thành công");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="title d-flex justify-content-center ">Log in</div>
      <span>Email or userName "eve.holt@reqres.in"</span>
      <div className="form-group">
        <input
          type="text"
          placeholder="Email or userName"
          value={email}
          onChange={(e) => {
            handleChangeEmail(e);
          }}
        />
      </div>
      <div className="form-group">
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
        disabled={email && password.length >= 6 ? false : true}
        onClick={handleSubmit}
      >
        Login
      </button>
      <div className="back">Go back</div>
    </div>
  );
}

export default Login;
