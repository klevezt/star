import React, { useEffect, useState } from "react";
import { truncateString } from "../../../helpers/functions";
import { Link } from "react-router-dom";
import Tag from "../../Tag/Tag";
import styles from "./Home.module.css";
import FilterButton from "../../UI/Buttons/FilterButton/FilterButton";
import MoreButton from "../../UI/Buttons/MoreButton/MoreButton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let controller = new AbortController();

    setIsLoading(true);
    const exec = async () => {
      const data = await fetch("http://localhost:5000/post/all")
        .then((data) => data.json())
        .catch((err) => console.log(err));
      if (filter === "") {
        setPosts(data);
      } else {
        const tmp = data.filter((post) => post.category === filter);
        setPosts(tmp);
      }

      const data2 = await fetch("http://localhost:5000/category/all")
        .then((data) => data.json())
        .catch((err) => console.log(err));
      setCategories(data2);
      setIsLoading(false);
    };
    exec();

    return () => controller?.abort();
  }, [filter]);

  const allPosts = posts.map((post, i) => {
    return (
      <div className={`${styles["img-wrapper"]}`} key={i}>
        <div>
          <Link to={`/${post.category}/${post._id}/${post.slug}`}>
            <img
              src={
                post.image !== ""
                  ? "/assets/uploads/" + post.image
                  : "data:image/png;base64,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"
              }
              alt={`post-${i}`}
            />
          </Link>
        </div>
        <div>
          <h4>{post.title}</h4>
          <h6>{post.subtitle}</h6>
          <div className="my-2">
            {post.tags.map((tag, i) => {
              return <Tag title={tag} key={i} />;
            })}
          </div>
          <p>{truncateString(post.text, 150)}</p>
          <MoreButton text="Read More" to={`/${post.category}/${post._id}/${post.slug}`} />
        </div>
      </div>
    );
  });

  const allCategories = categories.map((category, i) => {
    return (
      <h6 onClick={() => setFilter(category.title)} key={i}>
        {category.title}
      </h6>
    );
  });

  return (
    <div className="row m-0 mb-5">
      <div className="col-12 col-md-8 order-2 order-md-1">
        {filter === "" && <h2>All posts</h2>}
        {filter !== "" && <h2>{filter}</h2>}
        {isLoading && <p>Loading ...</p>}
        {!isLoading && (
          <>
            {allPosts.length === 0 && <p>There are no posts</p>}
            {allPosts}
          </>
        )}
      </div>
      <div
        className={`col-12 col-md-4 order-1 order-md-2 mb-4 ${styles["sidebar-categories"]}`}
      >
        <h2>All categories</h2>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && (
          <>
            {allCategories.length === 0 && <p>There are no categories</p>}
            {allCategories}
            {filter !== "" && (
              <FilterButton text="Clear filter" onClick={() => setFilter("")} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
