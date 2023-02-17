import { useLoaderData } from "react-router-dom";

const Collection = () => {
  const collections = useLoaderData();

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {collections.map((collection) => {
            return (
              <div key={collection.id} className="col-3">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
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

export default Collection;
