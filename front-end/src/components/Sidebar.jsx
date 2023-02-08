import React from "react";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <ul className="SidebarList">
        <div style={{ height: "calc(100vh - 50px)" }} className="Sidebar-main">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname == val.link ? "active" : ""}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {" "}
                <div>
                  <div className="val-icon">{val.icon}</div>
                  <div className="val-title">{val.title}</div>
                </div>
              </li>
            );
          })}{" "}
        </div>
        {/* -----EDITABLE */}

        <li
          key={5}
          className="row Log-Out"
          id={window.location.pathname == "/logout" ? "active" : ""}
          onClick={handleLogout}
        >
          {" "}
          <div>
            <div className="val-icon">
              <LogoutIcon />
            </div>
            <div className="val-title">LogOut</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
