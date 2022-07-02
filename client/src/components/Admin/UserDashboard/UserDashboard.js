import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserDashboard.module.css";
import { Routes, Route } from "react-router-dom";
import Posts from "../Posts/Posts";
import Categories from "../Categories/Categories";
import Home from "../Home/Home";
import PostInside from "../../Post/PostInside";

const UserDashboard = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles["sidebar-ul"]}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/add-post"}>Add post</Link>
        </li>
        <li>
          <Link to={"/add-category"}>Add category</Link>
        </li>
      </ul>
      <div className={styles["main-content"]}>
        <Routes>
          <Route path="/add-post" element={<Posts />} />
          <Route path="/add-category" element={<Categories />} />
          <Route path="/:category/:id/:slug" exact element={<PostInside />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
