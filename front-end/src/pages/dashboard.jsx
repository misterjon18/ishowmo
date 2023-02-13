import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// ------------EDIT
// import "./styles/Sidebar.css";

const Dashboard = () => {
  const posts = useLoaderData();
  // useEffect(() => {
  //   return () => {
  //     if (sessionStorage.getItem("welcome") == "true") {
  //       alert("Successfully login");
  //       sessionStorage.setItem("welcome", "false");
  //     }
  //   };
  // }, []);
  return (
    <>
      <div class="container">
        <div class="row">
          {posts.map((post) => {
            return (
              <div class="col-4">
                <img src={post.source} style={{ width: "100%" }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
