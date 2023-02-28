import React from "react";
import { useLoaderData } from "react-router-dom";

export default function SeeUnlockedCollection() {
  const dat = useLoaderData();

  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        {dat.map((dt) => {
          return (
            <div
              key={dt.post_id}
              className="col-3 card card-body "
              style={{ backgroundColor: "green" }}
            >
              <img
                id="post-image"
                src={`http://localhost:8000/${dt.source}`}
                alt="posts-img"
              />
              <p className="card-text">{dt.type}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
