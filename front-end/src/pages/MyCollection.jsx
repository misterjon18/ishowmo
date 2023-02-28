import {
  NavLink,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

export const MyCollection = () => {
  const myCollections = useLoaderData();
  const navigate = useNavigate();
  function addCollection() {
    navigate("/add-collection");
  }

  return (
    <>
      <div className="container mt-2">
        <button
          className="btn-primary btn"
          onClick={addCollection}
          style={{ marginBottom: "15px", marginTop: "15px" }}
        >
          Add Collection
        </button>
        <div className="row">
          {myCollections.collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card" style={{ width: "100%" }}>
                  <button
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    className="btn btn-outline-primary"
                    onClick={() => {
                      navigate(`/collections/${collection.collection_id}`);
                    }}
                  >
                    View
                  </button>
                  <div className="card-body">
                    <h5 className="card-title">{collection.name}</h5>
                    <p className="card-text">{collection.type}</p>
                    {/* {collection.type === "private" && (
                      <button>Unlock Collection</button>
                    )} */}
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
