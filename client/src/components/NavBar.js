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
        to="/"
        style={linkStyles}
        activeStyle={{
          background: "rgb(143, 172, 162)",
        }}
      >
        Login/Sign Up
      </NavLink>
      <NavLink
        to="/new"
        style={linkStyles}
        activeStyle={{
          background: "rgb(143, 172, 162)",
        }}
      >
        Add New Discount
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
    </div>
  );
};

export default NavBar;
