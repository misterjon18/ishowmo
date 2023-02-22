import { useLoaderData, Form, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { PRIMARY_COLOR } from "../constants";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function Post() {
  const [post, comments, likeCount, likePost] = useLoaderData();
  let { postId } = useParams();

  return (
    <>
      <div className="container">
        {/* START */}
        {localStorage.getItem("collector_id") == post.collector_id && (
          <Form method="delete">
            <input
              name="post_id"
              type="text"
              style={{ display: "none" }}
              value={post.post_id}
            />
            <button type="submit" className="btn">
              Delete Post
            </button>
          </Form>
        )}
        {/* // END */}
        <div className="row">
          <div className="col-6 my-5 ">
            <img src={"/" + post.source} style={{ width: "100%" }} />
            <Form
              method={likePost ? "delete" : "post"}
              action={`/posts/${postId}/like`}
            >
              <button type="submit" className="link-muted me-2">
                <ThumbUpOffAltIcon
                  style={{ color: likePost ? "red" : "initial" }}
                />
                {likeCount}
              </button>
            </Form>
          </div>

          {/* EDIT */}
          <div className="col-6">
            <div
              className="container my-5 py-5 text-dark"
              style={{ backgroundColor: "#f0f2f5", marginLeft: "auto" }}
            >
              <div className="row d-flex justify-content-center">
                <div
                  className="col-md-11 col-lg-9 col-xl-7"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  <Form method="post">
                    <div className="my-2">
                      <textarea
                        className="form-control"
                        name="comment"
                        rows="3"
                      ></textarea>
                      <button type="submit" className="btn">
                        Add Comment
                      </button>
                    </div>
                  </Form>
                  {comments.map((comment) => {
                    return (
                      <>
                        <div
                          key={comment.comment_id}
                          className="d-flex flex-start mb-4"
                        >
                          <img
                            className="rounded-circle shadow-1-strong me-3"
                            src="/src/assets/user.png"
                            alt="avatar"
                            width="65"
                            height="65"
                          />
                          <div className="card w-100">
                            <div className="card-body p-4">
                              <div className="">
                                <h5>{comment.username}</h5>
                                <p className="small">
                                  {formatDistanceToNowStrict(
                                    new Date(comment.created_at)
                                  )}
                                </p>
                                <p>{comment.comment}</p>

                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center"></div>
                                  {localStorage.getItem("collector_id") ==
                                    comment.collector_id && (
                                    <Form method="delete">
                                      <input
                                        name="comment_id"
                                        type="text"
                                        style={{ display: "none" }}
                                        value={comment.comment_id}
                                      />
                                      <button type="submit" className="btn">
                                        <i></i>Delete
                                      </button>
                                    </Form>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
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
