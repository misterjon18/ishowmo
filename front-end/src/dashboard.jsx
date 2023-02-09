import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// ------------EDIT
// import "./styles/Sidebar.css";

const Dashboard = () => {
  const posts = useLoaderData();
  console.log(posts.length);
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
          <div class="col">1 of 2</div>
          <div class="col">2 of 2</div>
        </div>
        <div class="row">
          <div class="col">1 of 3</div>
          <div class="col">2 of 3</div>
          <div class="col">3 of 3</div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
