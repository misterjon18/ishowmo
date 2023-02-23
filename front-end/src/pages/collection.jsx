import { useLoaderData, Form } from "react-router-dom";

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
                    <Form method="POST">
                      {/* HACKABLE */}
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
                        <button>Unlock Collection</button>
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
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;
