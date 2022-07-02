import React, { useState } from "react";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { authenticateUserWithToken } from "../api/login";

const Login = () => {
  let navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const usernameInputHandler = (e) => {
    setUsernameValid(true);
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPasswordValid(true);
    setPassword(e.target.value);
  };

  const authenticateUser = (uname, psw) => {
    authenticateUserWithToken(uname, psw)
      .then(({ user }) => {

        // ---- Error Handler ---- //
        if (!user) {
          throw new Error("Δεν είναι σωστά τα στοιχεία εισόδου");
        }
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
          authenticated: true,
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        // console.log(err);
        setError(true);
        setErrorMessage(err.message);
      });
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    if (username === "") return setUsernameValid(false);
    if (password === "") return setPasswordValid(false);

    authenticateUser(username, password);
  };

  return (
    <form
      method="post"
      onSubmit={(e) => loginFormSubmitHandler(e)}
      className={styles.form}
    >
      <div className="form-header">
        <h2 className="form-headline">LOGIN</h2>
      </div>
      <div className="container">
        <div className="row mb-3">
          {error && (
            <div
              className="alert alert-danger p-2 m-0 text-center"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </div>

        <div className="row mb-3">
          <label htmlFor="uname" className="col-sm-3 col-form-label">
            Username
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm ${
                !usernameValid ? "is-invalid" : ""
              } `}
              type="text"
              placeholder="Enter Username"
              name="uname"
              id="uname"
              value={username}
              onChange={usernameInputHandler}
              autoComplete="off"
              required
            />
            <div className="invalid-feedback">Username should not be empty</div>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="psw" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm ${
                !passwordValid ? "is-invalid" : ""
              } `}
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="psw"
              value={password}
              onChange={passwordInputHandler}
              autoComplete="off"
              required
            />
            <div className="invalid-feedback">Password should not be empty</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="offset-sm-3">
            <button type="submit" className="btn btn-primary btn-sm">
              Log In
            </button>
            <Link to="/register" className="btn btn-warning btn-sm ms-2">
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
