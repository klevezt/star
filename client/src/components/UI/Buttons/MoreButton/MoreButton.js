import React from "react";
import { Link } from "react-router-dom";
import styles from "./MoreButton.module.css";

const MoreButton = ({text, to}) => {
  return (
    <Link to={to} className={styles.button}>{text}</Link>
  );
};

export default MoreButton;
