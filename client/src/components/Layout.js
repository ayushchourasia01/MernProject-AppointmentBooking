import React, { useState } from "react";
import "../../src/layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-hospital-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-add-circle-line",
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-list-ordered",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "ri-service-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={collapsed ? "sidebar sidebar-mobile" : "sidebar"}>
          <div className="sidebar-header">
            <h1 className="card-title">{!collapsed ? "Stay Healthy" : "SH"}</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, i) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={
                    isActive
                      ? "active-menu-item d-flex menu-item"
                      : "d-flex menu-item"
                  }
                  key={i}
                >
                  <Link to={menu.path}>
                    <i className={menu.icon}></i>
                  </Link>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={"d-flex menu-item"}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <Link to="/login">
                <i className="ri-logout-circle-line"></i>
              </Link>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {!collapsed ? (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            )}

            <div className="d-flex align-items-center px-2">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-2-line header-action-icon px-2 "></i>
              </Badge>

              {user?.isDoctor ? (
                <Link
                  className="anchor1 mx-3"
                  to="/doctor/profile/${user?._id}"
                >
                  {user?.firstName}
                </Link>
              ) : (
                <Link className="anchor1 mx-3" to="/">
                  {user?.firstName}
                </Link>
              )}
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
