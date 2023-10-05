import { NavLink } from "react-router-dom";

const NavBar() {
    const linkStyles = {
        display: "inline-block",
        width: "200px",
        padding: "12px",
        margin: "0 6px 6px",
        background: "rgba(3, 70, 55, 0.26)",
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
            to="/credit_cards"
            style={linkStyles}
            activeStyle={{
              background: "rgb(143, 172, 162)",
            }}
          >
            Credit Cards
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
    }
    
    export default NavBar;
}