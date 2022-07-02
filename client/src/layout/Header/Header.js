import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const Header = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useStateValue();

  const logoutHandler = () => {
    dispatch({
      type: actionTypes.LOGOUT_USER,
      user: null,
      authenticated: false,
    });
    navigate("/", { replace: true });
  }

  return (
    <header className={styles.header}>
      <div className={styles["header--inside"]}>
        <Link to="/" className={styles.link}>
          Star TV
        </Link>
        {state.authenticated ? (
          <button className={styles.link} onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
