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
        <button onClick={addCollection}>Add Collection</button>
        <div className="row">
          {myCollections.collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card" style={{ width: "100%" }}>
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
