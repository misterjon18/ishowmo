import React, { useEffect } from "react";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import app from "../../lib/axios-config";
function getPoints() {
  return app.get(
    "/my-points",
    // Pass the token and headers----------------
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

function Sidebar() {
  // ==========Remove token for logout
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const [points, setPoints] = useState(0);
  useEffect(() => {
    async function init() {
      const result = await getPoints();
      setPoints(result.data.points);
    }
    init();
  }, [location.pathname]);

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
          <div style={{ color: "white", padding: "10px" }}>
            {" "}
            Your Points : {points}{" "}
          </div>
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
