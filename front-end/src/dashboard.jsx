import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// ------------EDIT
import "./styles/Sidebar.css";

const Dashboard = () => {
  const images = useLoaderData();
  useEffect(() => {
    console.log(images);
    return () => {
      if (sessionStorage.getItem("welcome") == "true") {
        alert("Successfully login");
        sessionStorage.setItem("welcome", "false");
      }
    };
  }, []);
  return (
    <>
      <div className="App">
        hellohellohellohellohellohellohellohellohellohellohellohellohellohello
        {images.map((image) => {
          <div key={image.source}>
            <img
              src={image.source} // get source name in backend
              alt="some image"
              width="500"
              height="500"
            />
          </div>;
        })}
      </div>
    </>
  );
};
export default Dashboard;
