import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import "../styles/SeeUnlockedCollection.css";

export default function SeeUnlockedCollection() {
  const posts = useLoaderData();

  return (
    <>
      <div className="container row" style={{ textAlign: "center" }}>
        {posts.map((post) => {
          return (
            <div key={post.post_id} className="col-3 See-Unlock">
              <Link to={`/posts/${post.post_id}`}>
                <img
                  className="unlock-img"
                  id="post-image"
                  src={`http://localhost:8000/${post.source}`}
                  alt="posts-img"
                />
                <p className="card-text">{post.type}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
