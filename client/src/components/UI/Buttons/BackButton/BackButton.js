import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./BackButton.module.css";

const BackButton = () => {
  let navigate = useNavigate();

  return (
    <div className="w-100">
      <button className={styles.button} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
