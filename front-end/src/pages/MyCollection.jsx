import {
  NavLink,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import "../styles/MyCollection.css";
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
          style={{
            marginBottom: "15px",
            marginTop: "15px",
            marginLeft: "30px",
          }}
        >
          Add Collection
        </button>
        <div className="row">
          {myCollections.collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card" id="card">
                  <span id="btn-container">
                    <button
                      id="btn"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        navigate(`/collections/${collection.collection_id}`);
                      }}
                    >
                      View
                    </button>
                  </span>
                  <div className="card-body" style={{ textAlign: "center" }}>
                    <h5 className="card-title">{collection.name}</h5>
                    <p className="card-text">{collection.type}</p>
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
