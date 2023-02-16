import React from "react";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  // ==========Remove token for logout
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    // ===========
  };
  return (
    <div className="Sidebar">
      {/* EDIT */}
      <div className="Sidebar-main">
        <img id="brandLogo" src="/src/assets/capstoner.png" />
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <NavLink key={key} to={val.link}>
                <li className="row">
                  {" "}
                  <div>
                    <div className="val-icon">{val.icon}</div>
                    <span className="val-title">{val.title}</span>
                  </div>
                </li>
              </NavLink>
            );
          })}{" "}
        </ul>
      </div>
      <div
        className="row Log-Out"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <div className="val-icon">
          <LogoutIcon />
        </div>
        <div className="val-title">LogOut</div>
      </div>
    </div>
  );
}
export default Sidebar;
