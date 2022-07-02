import React from "react";
import {  useNavigate } from "react-router-dom";
import BackButton from "../../UI/Buttons/BackButton/BackButton";
import AddNewPost from "../Forms/AddNewPost";

const Posts = () => {
  let navigate = useNavigate();

  return (
    <>
      <BackButton />
      <AddNewPost />
    </>
  );
};

export default Posts;
