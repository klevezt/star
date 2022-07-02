import React, { useEffect, useState } from "react";
import Post from "../Post/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();

    setIsLoading(true);

    const exec = async () => {
      const data = await fetch("http://localhost:5000/post/all")
        .then((data) => data.json())
        .then((data) =>
          data.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
        )
        .catch((err) => console.log(err));
      setPosts(data);
      setIsLoading(false);
    };
    exec();

    return () => controller?.abort();
  }, []);

  const latestPosts = posts.map((post, i) => {
    if (i < 5) return <Post key={i} post={post} />;
  });

  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && (
        <>
          <h2 className="my-5">Latest Posts</h2>
          <div className="row">
            {latestPosts.length === 0 && <p>There are no posts</p>}
            {latestPosts}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
