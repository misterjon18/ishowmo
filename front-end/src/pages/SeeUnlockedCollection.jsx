import React from "react";
import { useLoaderData } from "react-router-dom";

export default function SeeUnlockedCollection() {
  const images = useLoaderData();

  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        {images.posts.map((image) => {
          return (
            <div key={image.id} className="col-3">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <img id="post-image" src={image.source} alt="posts-img" />
                  <p className="card-text">{image.type}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
