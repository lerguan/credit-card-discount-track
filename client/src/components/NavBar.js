import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const linkStyles = {
    display: "inline-block",
    width: "200px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "rgba(3, 70, 55, 0.26)",
  };

  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((resp) => {
      if (resp.ok) {
        setUser(null);
      }
    });
  };

  return (
    <div>
      <NavLink
        exact
        to="/main"
        style={linkStyles}
        activeStyle={{
          background: "rgb(143, 172, 162)",
        }}
      >
        Main
      </NavLink>
      <NavLink
        to="/stores"
        style={linkStyles}
        activeStyle={{
          background: "rgb(143, 172, 162)",
        }}
      >
        Stores
      </NavLink>
      <NavLink
        exact
        to="/logout"
        style={linkStyles}
        activeStyle={{
          background: "rgb(143, 172, 162)",
        }}
        onClick={handleLogoutClick}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default NavBar;
