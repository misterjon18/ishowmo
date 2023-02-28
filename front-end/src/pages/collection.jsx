import {
  useLoaderData,
  Form,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

const Collection = () => {
  const collections = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {collections
            .map((collection) => {
              return (
                <div key={collection.id} className="col-3">
                  <div className="card" style={{ width: "100%" }}>
                    <div className="">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          navigate(`/collections/${collection.collection_id}`);
                        }}
                      >
                        View
                      </button>

                      <h5 className="card-title">{collection.name}</h5>
                      <p className="card-text">{collection.type}</p>
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
                          <button className="btn btn-info">
                            Unlock Collection
                          </button>
                        )}
                      </Form>
                      <div>
                        {collection.type === "private" &&
                          collection.required_points}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            .filter(
              (collection) =>
                collection.collector_id != localStorage.getItem("collector_id")
            )}
        </div>
      </div>
    </>
  );
};

export default Collection;
