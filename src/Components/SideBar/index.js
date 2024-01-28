import React from "react";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="content" onClick={() => navigate("/admin/user")}>
          <h3>Users</h3>
        </div>
        <div className="content" onClick={() => navigate("/admin/property")}>
          <h3>Property/Hostel</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
