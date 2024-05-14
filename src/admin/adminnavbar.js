import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { Button } from '../styles/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminNavbar = () => {
    const [menuIcon, setMenuIcon] = useState();
    const [isLoggedIn, setLogin] = useState(localStorage.getItem("token"));

    const logout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem('user')
      setLogin(null)
    }
    const AdminNavbar = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      margin: auto;
      

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }
   
    .mobile-navbar-btn {
      display:none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

   

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.3rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }
   

    
      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: relative;
        top: 30%;
        left: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }
      

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 250px;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        background-color: black;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
         transform: translateX(100%); 
         transform-origin: top; 
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
       transform: translateX(0); 
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      
      .user-logout,
      .user-login {
        font-size: 1.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;
  return (
    <div>
   
   <AdminNavbar>
   

      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
          <NavLink to="/">
         <Button onClick={logout} className="user-login"><LogoutIcon/></Button>
         </NavLink>
          </li>
          </ul>
          </div>
      
   </AdminNavbar>
    </div>
  )
}

export default AdminNavbar