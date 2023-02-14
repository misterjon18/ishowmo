import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Layout = () => {
  return (
    <div
      style={{
        display: "flex",

        height: "100vh",
        oveflow: "auto",
      }}
    >
      <div>
        <Sidebar />
      </div>

      <div style={{ flexGrow: 1 }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
