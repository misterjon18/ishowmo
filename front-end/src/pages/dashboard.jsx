import { Link, useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { PRIMARY_COLOR } from "../constants";
import "../styles/Dashboard.css";
import { useRef } from "react";
import app from "../../lib/axios-config";

const Dashboard = () => {
  const posts = useLoaderData();
  const fileInput = useRef(null);

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  return (
    <>
      <div className="container">
        {/* Add Button */}
        <div className="row ">
          <div className="col-2 offset-10">
            <input
              type="file"
              multiple
              ref={fileInput}
              style={{ display: "none" }}
              onChange={async (event) => {
                const formData = new FormData();
                const source = event.target.files[0];
                formData.append("source", source);
                await app.post("/posts", formData, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                  },
                });
                // fetcher.load("/dashboard");
                location.reload();
                // refreshPage();
              }}
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
            />
            <button
              onClick={() => {
                fileInput?.current?.click();
              }}
              className="btn"
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: "whitesmoke",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Add Post
            </button>
          </div>
        </div>
        <div className="row">
          {posts.map((post) => {
            return (
              <div className="col-4" key={post.post_id}>
                {/* use Link if your using internal links  */}
                {/* only use a href for outside links e.g. facebook */}
                <Link to={`/posts/${post.post_id}`}>
                  <img
                    id="collection-image"
                    src={post.source}
                    alt="posts-img"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
