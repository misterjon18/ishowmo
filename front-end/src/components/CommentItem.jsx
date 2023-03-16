import { formatDistanceToNowStrict } from "date-fns";
import { useLoaderData, Form, useParams } from "react-router-dom";
import { useState } from "react";

export const CommentItem = ({ comment }) => {
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const onEditClick = () => {
    setIsEdit(true);
  };
  const onCancelClick = () => {
    setIsEdit(false);
  };

  return (
    <>
      <div className="d-flex flex-start mb-4">
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
                {formatDistanceToNowStrict(new Date(comment.created_at))}
              </p>

              {isEdit ? (
                <>
                  <Form
                    method="patch"
                    action={`/post/${params.postId}/comments`}
                  >
                    <input
                      readOnly
                      type="hidden"
                      name="comment_id"
                      value={comment.comment_id}
                    />
                    <textarea
                      name="comment"
                      autoFocus
                      className="form-control"
                      defaultValue={comment.comment}
                    />
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn"
                        onClick={onCancelClick}
                      >
                        Cancel
                      </button>

                      <button type="submit" className="btn">
                        Save
                      </button>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <p>{comment.comment}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn" onClick={onEditClick}>
                      Edit
                    </button>
                    {localStorage.getItem("collector_id") ==
                      comment.collector_id && (
                      <Form method="delete">
                        <input
                          name="comment_id"
                          type="hidden"
                          value={comment.comment_id}
                          readOnly
                        />
                        <button type="submit" className="btn">
                          <i></i>Delete
                        </button>
                      </Form>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
