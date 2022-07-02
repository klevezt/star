import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewCategory = () => {
  let navigate = useNavigate();

  const [titleValid, setTitleValid] = useState(true);

  const titleRef = useRef("");
  const slugRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleRef.current.value === "") return setTitleValid(false);

    const slug =
      slugRef.current.value !== ""
        ? slugRef.current.value
        : titleRef.current.value.replace(/\s+/g, "-").toLowerCase();

    const formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("slug", slug);

    await fetch("http://localhost:5000/category/add", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .catch((err) => console.log(err));

    navigate("/", { replace: true });
  };

  return (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-header">
        <h2 className="form-headline mb-5">Add new category</h2>
      </div>
      <div className="container">
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Title
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm ${
                !titleValid ? "is-invalid" : ""
              } `}
              type="text"
              placeholder="Enter title"
              name="title"
              id="title"
              autoComplete="off"
              ref={titleRef}
              onChange={() => {
                setTitleValid(true);
              }}
              required
            />
            <div className="invalid-feedback">Title should not be empty</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="slug" className="col-sm-3 col-form-label">
            Slug
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm`}
              type="text"
              placeholder="Enter slug ( Optional )"
              name="slug"
              id="slug"
              ref={slugRef}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-9 offset-3">
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
            <button type="reset" className="btn btn-danger btn-sm mx-2">
              Clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewCategory;
