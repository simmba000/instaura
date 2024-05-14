// Sidebar.js
import React, { useState } from "react";
import styled from "styled-components";
import {  NavLink } from "react-router-dom";
import AdminLogo from "../images/admin-logo.png";
import { useEffect } from "react";
import navItem from "../config/navConfig";

const SidebarContainer = styled.div`
  background-color: white;
  color: rgb(4 71 95); /* Orange-Red font color */
  width: 250px;
  height: 100%;
  

  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 4px 6px 3px grey;
  padding: 1em;

  .admin-logo {
    height:65px;
    width:65px;
    font-size: 2rem;
    margin-bottom: 3rem;
   align-self:center;
  }

  .sidebar-link {
    width: 100%
    text-decoration: none;
    color: #000; 
    font-size: 1.8rem;
    ${'' /* margin: 0.5rem 0; */}
  }
  .sidebar-link:hover{
    background-color:#1644596e;
    width:100%;
  }
  .sidebar-link.active{
    background-color:#16445936;
    width:100%;
  }

`;

const AdminSidebar = () => {
  const [route1, setRoute1] = useState("admindashboard");
  useEffect(() => {
    const path = window.location.pathname;
    const page = path.substring(1); // Remove the leading "/"
    console.log(page);
    setRoute1(page);
  }, []);

  return (
    <SidebarContainer>
      <div className="admin-logo">
        <img src={AdminLogo} alt="my admin logo img" className="logo1" />
      </div>
      <div
        style={{
          font: "14em",
          display: "flex",
          justifyContent: "center",
          fontSize: "1.3rem",
          textShadow: "0.5px 0.5px",
          marginBottom:'1rem',
        }}
      >
        Welcome, Admin
      </div>
      {navItem.map((item, i) => (
        <NavLink to={item.link} className={"sidebar-link"}>
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </SidebarContainer>
  );
};

export default AdminSidebar;
