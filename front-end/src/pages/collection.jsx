import {
  useLoaderData,
  Form,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import "../styles/Collection.css";

const Collection = () => {
  const collections = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-2">
        <div className="row" style={{ textAlign: "center", marginTop: "30px" }}>
          {collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card">
                  <div className="">
                    <span id="btn-container">
                      <button
                        disabled={!collection.has_unlocked}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          navigate(`/collections/${collection.collection_id}`);
                        }}
                      >
                        View
                      </button>
                    </span>

                    <h5 className="card-title" style={{ color: "blue" }}>
                      {collection.name}
                    </h5>
                    <p className="card-text" style={{ color: "blue" }}>
                      {collection.type}
                    </p>
                    <Form
                      method="POST"
                      action={`/collectors/${params.collectorId}/unlocked`}
                    >
                      <input
                        name="paid_points"
                        value={collection.required_points}
                        style={{ display: "none" }}
                      />
                      <input
                        name="collection_id"
                        value={collection.collection_id}
                        style={{ display: "none" }}
                      />
                      {!collection.has_unlocked && (
                        <button
                          className="btn btn-info"
                          style={{ color: "whitesmoke" }}
                        >
                          Unlock Collection
                        </button>
                      )}
                    </Form>
                    <div>
                      {collection.type === "private" &&
                        `${collection.required_points} point(s) to unlocked`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;
