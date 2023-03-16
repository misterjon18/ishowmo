import { useLoaderData, Form, useParams } from "react-router-dom";

import { PRIMARY_COLOR } from "../constants";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import "../styles/Post.css";
import { CommentItem } from "../components/CommentItem";

export default function Post() {
  const [post, comments, likeCount, likePost, getUsername] = useLoaderData();
  let { postId } = useParams();

  return (
    <>
      <div className="container">
        {localStorage.getItem("collector_id") == post.collector_id && (
          <Form method="delete">
            <input name="post_id" type="hidden" value={post.post_id} readOnly />
            <button
              type="submit"
              className="btn btn-outline-primary btn-sm delete-post-btn"
            >
              Delete Post
            </button>
          </Form>
        )}

        <div className="row">
          <div className="col-6 my-5" style={{ paddingLeft: "40px" }}>
            {post.type.includes("image") ? (
              <img
                src={"/" + post.source}
                style={{ width: "90%", height: "400px", borderRadius: "10px" }}
              />
            ) : post.type.includes("video") ? (
              <video className="post-item" controls>
                <source src={"/" + post.source} type={post.type} />
              </video>
            ) : null}

            <Form
              method={likePost ? "delete" : "post"}
              action={`/posts/${postId}/like`}
            >
              <button type="submit" className="link-muted me-2" id="btn-thumb">
                <ThumbUpOffAltIcon
                  style={{ color: likePost ? "red" : "initial" }}
                />
                {likeCount}
              </button>
              <span>Posted by : {getUsername[0].username}</span>
            </Form>
          </div>

          {/* EDIT */}
          <div className="col-5">
            <div
              className="container my-5 py-4 text-dark"
              style={{ backgroundColor: "#f0f2f5", marginLeft: "auto" }}
            >
              <div className="row d-flex justify-content-center">
                <div
                  className="col-11"
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    borderRadius: "10px",
                  }}
                >
                  <Form method="post">
                    <div className="my-4">
                      <textarea
                        className="form-control"
                        name="comment"
                        rows="3"
                      ></textarea>
                      <button
                        type="submit"
                        className="btn btn-outline-light mt-1"
                      >
                        Add Comment
                      </button>
                    </div>
                  </Form>
                  {comments.map((comment) => {
                    return (
                      <CommentItem key={comment.comment_id} comment={comment} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
