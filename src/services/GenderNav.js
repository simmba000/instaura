import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const GenderNav = () => {
  const [menuIcon, setMenuIcon] = useState();
  return (
    <div className="GenderNav">
      <ul className="GenderNavLists">
        <li>
          <NavLink
            to="/ladies"
            className="GenderNavLink"
            activeClassName="active"
            onClick={() => setMenuIcon(true)}
          >
            Women &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gents"
            className="GenderNavLink"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Men &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kids"
            className="GenderNavLink"
            activeClassName="active"
            onClick={() => setMenuIcon(false)}
          >
            Kids
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GenderNav;
