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
        {SidebarData.map((val, key) => {
          console.log(key);
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
                {val.icon}
                {val.title}
              </div>
              {/* <div>{val.title}</div> */}
            </li>
          );
        })}
        {/* -----EDITABLE */}
        <li
          key={5}
          className="row"
          id={window.location.pathname == "/logout" ? "active" : ""}
          onClick={handleLogout}
        >
          {" "}
          <div>
            <LogoutIcon />
            <span style={{ paddingLeft: 20 }}>LogOut</span>
          </div>
          {/* <div>{val.title}</div> */}
        </li>

        {/* ========== */}

        {/* ========== */}
      </ul>
    </div>
  );
}
export default Sidebar;
