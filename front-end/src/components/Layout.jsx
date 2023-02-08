import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 30,
        height: "100vh",
        oveflow: "auto",
        backgroundColor: "green",
      }}
    >
      <div style={{ backgroundColor: "pink" }}>
        <Sidebar />
      </div>

      <div style={{ flexGrow: 1 }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
