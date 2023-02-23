import { useLoaderData } from "react-router-dom";

export const MyCollection = () => {
  const myCollections = useLoaderData();

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {myCollections.collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">{collection.name}</h5>
                    <p className="card-text">{collection.type}</p>
                    {collection.type === "private" && (
                      <button>Unlock Collection</button>
                    )}
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
