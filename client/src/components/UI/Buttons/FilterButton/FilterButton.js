import React from 'react'
import styles from "./Filter.module.css";

const FilterButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default FilterButton