import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import bcrypt from "bcryptjs";

const Register = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  //   const confirmPasswordRef = useRef("");

  const usernameInputHandler = (e) => {
    setUsernameValid(true);
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmInputHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const registerFormSubmitHandler = (e) => {
    e.preventDefault();
    if (username === "") return setUsernameValid(false);

    if (password !== confirmPassword) return setPasswordValid(false);
    fetch("http://localhost:5000/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      }),
    })
      .catch((err) => console.log(err))
      .finally(navigate("/login"));
  };

  return (
    <form
      method="post"
      onSubmit={(e) => registerFormSubmitHandler(e)}
      className={styles.form}
    >
      <div className="form-header">
        <h2 className="form-headline">REGISTER</h2>
      </div>
      <div className="container">
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
              autoComplete="off"
              value={username}
              onChange={usernameInputHandler}
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
              }`}
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="psw"
              autoComplete="off"
              value={password}
              onChange={passwordInputHandler}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="confirm_psw" className="col-sm-3 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm ${
                !passwordValid ? "is-invalid" : ""
              }`}
              type="password"
              placeholder="Enter confirm Password"
              name="confirm_psw"
              id="confirm_psw"
              autoComplete="off"
              value={confirmPassword}
              onChange={passwordConfirmInputHandler}
              required
            />
            <div className="invalid-feedback">Passwords don't match</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="offset-sm-3">
            <button type="submit" className="btn btn-primary btn-sm">
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
