import { Link, useLoaderData } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const posts = useLoaderData();

  return (
    <>
      <div className="container">
        <div className="row">
          {posts.map((post) => {
            return (
              <div className="col-4">
                {/* use Link if your using internal links  */}
                {/* only use a href for outside links e.g. facebook */}
                <Link to={`/posts/${post.post_id}`}>
                  <img
                    id="collection-image"
                    src={post.source}
                    alt="posts-img"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
