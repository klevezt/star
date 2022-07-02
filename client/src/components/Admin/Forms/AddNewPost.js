import React, { useEffect, useRef, useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AddNewPost = () => {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [titleValid, setTitleValid] = useState(true);
  const [subtitleValid, setSubtitleValid] = useState(true);
  const [textValid, setTextValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const titleRef = useRef("");
  const subtitleRef = useRef("");
  const slugRef = useRef("");
  const textRef = useRef("");
  const categoryRef = useRef("");
  const imageRef = useRef("");
  const tagsRef = useRef("");
  const newTagRef = useRef("");

  useEffect(() => {
    let controller = new AbortController();

    const exec = async () => {
      const data = await fetch("http://localhost:5000/category/all").then(
        (data) => data.json()
      );
      setCategories(data);
    };
    exec();

    return () => controller?.abort();
  }, []);

  const handleRemoveTag = (index) => {
    const arr = tags.filter((_, i) => i !== index);
    setTags(arr);
  };

  const handleNewTag = () => {
    const arr = [];
    if (newTagRef.current.value !== "") {
      arr.push(newTagRef.current.value);
      setTags([...tags, arr[0]]);
      newTagRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleRef.current.value === "") return setTitleValid(false);
    if (subtitleRef.current.value === "") return setSubtitleValid(false);
    if (textRef.current.value === "") return setTextValid(false);
    if (categoryRef.current.value === "") return setCategoryValid(false);

    const slug =
      slugRef.current.value !== ""
        ? slugRef.current.value
        : titleRef.current.value.replace(/\s+/g, "-").toLowerCase();

    const formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("subtitle", subtitleRef.current.value);
    formData.append("slug", slug);
    formData.append("image", imageRef.current.files[0]);
    formData.append("text", textRef.current.value);
    formData.append("category", categoryRef.current.value);
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    await fetch("http://localhost:5000/post/add", {
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
        <h2 className="form-headline mb-5">Add new post</h2>
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
          <label htmlFor="subtitle" className="col-sm-3 col-form-label">
            Subtitle
          </label>
          <div className="col-sm-9">
            <input
              className={`form-control form-control-sm ${
                !subtitleValid ? "is-invalid" : ""
              } `}
              type="text"
              placeholder="Enter subtitle"
              name="subtitle"
              autoComplete="off"
              ref={subtitleRef}
              onChange={() => {
                setSubtitleValid(true);
              }}
              required
            />
            <div className="invalid-feedback">Subtitle should not be empty</div>
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
              ref={slugRef}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="text" className="col-sm-3 col-form-label">
            Text
          </label>
          <div className="col-sm-9">
            <textarea
              rows={5}
              className={`form-control form-control-sm ${
                !textValid ? "is-invalid" : ""
              } `}
              placeholder="Enter text"
              name="text"
              ref={textRef}
              autoComplete="off"
              onChange={() => {
                setTextValid(true);
              }}
              required
            />
            <div className="invalid-feedback">Text should not be empty</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="category" className="col-sm-3 col-form-label">
            Category
          </label>
          <div className="col-sm-9">
            <select
              className={`form-control form-control-sm mt-2 mb-3 ${
                !categoryValid ? "is-invalid" : ""
              } `}
              name="category"
              id="category"
              ref={categoryRef}
              onChange={() => {
                setCategoryValid(true);
              }}
              required
            >
              <option value="">-</option>
              {categories &&
                categories.map((category, i) => {
                  return (
                    <option
                      value={category.title}
                      key={category._id}
                      defaultValue={category.title}
                    >
                      {category.title}
                    </option>
                  );
                })}
            </select>
            <div className="invalid-feedback">Category should not be empty</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="image" className="col-sm-3 col-form-label">
            Image
          </label>
          <div className="col-sm-9">
            <input
              className="form-control form-control-sm"
              type="file"
              id="image"
              autoComplete="off"
              ref={imageRef}
            />
          </div>
        </div>

        <div className="row mb-5">
          <label htmlFor="tags" className="col-sm-3 col-form-label">
            Tags
          </label>

          <div className="col-sm-9">
            <div className="row">
              <label className="col-sm-12 col-form-label">
                {tags.length === 0 && <p className="m-0">There are no tags.</p>}
                {tags.map((tag, i) => {
                  return (
                    <Chip
                      className="mx-2 my-1"
                      label={tag}
                      onDelete={() => handleRemoveTag(i)}
                      color="primary"
                      key={i}
                    />
                  );
                })}
              </label>

              <div className="col-sm-5">
                <input
                  type="text"
                  placeholder="Add new tag"
                  className="form-control form-control-sm"
                  autoComplete="off"
                  ref={newTagRef}
                />
              </div>
              <div className="w-auto align-self-center">
                <Button
                  className="justify-self-center btn-primary"
                  variant="contained"
                  onClick={handleNewTag}
                  size="small"
                >
                  <AddCircleOutline />
                </Button>
              </div>
            </div>
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

export default AddNewPost;
