import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
// ------------EDIT
import "./styles/Sidebar.css";

const Dashboard = () => {
  useEffect(() => {
    return () => {
      if (sessionStorage.getItem("welcome") == "true") {
        alert("Successfully login");
        sessionStorage.setItem("welcome", "false");
      }
      // sessionStorage.removeItem("welcome");
    };
  }, []);
  return (
    <>
      {/* {sessionStorage.getItem("welcome")} */}

      <Sidebar />

      <div className="App"></div>
    </>
  );
};
export default Dashboard;
