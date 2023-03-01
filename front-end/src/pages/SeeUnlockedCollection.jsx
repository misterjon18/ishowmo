import React, { useRef } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import "../styles/SeeUnlockedCollection.css";
import app from "../../lib/axios-config";

export default function SeeUnlockedCollection() {
  const { posts, collection } = useLoaderData();
  const fileInput = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="container row" style={{ textAlign: "center" }}>
        {collection.collector_id ===
          Number(localStorage.getItem("collector_id")) && (
          <span style={{ textAlign: "end" }}>
            <button
              type="button"
              onClick={() => {
                fileInput?.current?.click();
              }}
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                marginRight: "30px",
              }}
              className="btn btn-outline-primary btn-sm"
            >
              Add Post to Collection
            </button>
            <input
              type="file"
              multiple
              ref={fileInput}
              style={{ display: "none" }}
              onChange={async (event) => {
                const formData = new FormData();

                const source = event.target.files[0];
                formData.append("source", source);
                formData.append("collection_id", collection.collection_id);
                await app.post("/posts", formData, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                  },
                });

                navigate(0);
              }}
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
            />
          </span>
        )}
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
                <p className="card-text">{post.type} </p>
                {collection.collector_id ===
                  Number(localStorage.getItem("collector_id")) && (
                  <button
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Delete
                  </button>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
