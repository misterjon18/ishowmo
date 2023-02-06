import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Layout = () => {
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ backgroundColor: "pink" }}>
        <Sidebar />
      </div>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
