import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("welcome");
    };
  }, []);
  return (
    <>
      {sessionStorage.getItem("welcome")}

      <div>Welcome to My Dashboard</div>
    </>
  );
};
export default Dashboard;
