import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { CgMenu, CgClose } from "react-icons/cg";
import { useAuth } from "../contexts/AuthContext";
import ProfileLogo from '../images/profile-logo.png'
import '../App.css'


const Nav = () => {
  // const { isLoggedIn, logout } = useAuth();
  const [menuIcon, setMenuIcon] = useState();
  const [isLoggedIn, setLogin] = useState(localStorage.getItem("token"));
  const [showDropdown, setShowDropdown] = useState(false);

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      margin: auto;
      

      ${'' /* .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
          transition: color 0.3s linear;
        }
       
        &:hover,
        &:active {
          color: #e62e00;
        }
      } */}
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


    .profile-dropdown {
      position: relative;

      .profile-img {
        width: 40px; /* Set width as needed */
        height: 40px; /* Set height as needed */
        border-radius: 50%;
        cursor: pointer;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #1a1a1a;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 2;

        a {
          color: white;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          font-size:1.2rem;
          font-weight:750;
        }

        a:hover {
          background-color: #f1f1f1;
          color: #e62e00;
          display:block;
        }
      }

      &:hover .dropdown-content {
        display: block;
      }
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
const logout = () =>{
  localStorage.removeItem("token")
  localStorage.removeItem('user')
  setLogin(null)
}
  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/services"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bridal"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
              Bridal
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
              Gallery
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/shop"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
              Shop
            </NavLink>
          </li> */}
         
          <li>
          <NavLink
              to="/custappointment"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
             Book an Appointment
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/location"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
             Location
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/about"
              className="navbar-link "
              activeClassName="active"
              onClick={() => setMenuIcon(false)}>
             About Us
            </NavLink>
          </li>
          <div>
              {isLoggedIn ? (
                <>
              
                <div className="profile-dropdown">
                  <img
                    src={ProfileLogo}
                    alt="Profile"
                    className="profile-img"
                  />
                 
                  <div className="dropdown-content">
                  <Link to="/myaccount" onClick={() => setMenuIcon(false)}>
                      My Account
                    </Link>
                    <Link to="/custbookings" onClick={() => setMenuIcon(false)}>
                      Bookings
                    </Link>
                    <Link to="/" onClick={logout}>
                      Logout
                    </Link>
                   
                  </div>
                </div>

              
                </>
                  ) : (
                      <>
                        <NavLink to="/login">
                          <Button className="user-login">Login</Button>
                        </NavLink>
                        <NavLink to="/register">
                          <Button className="user-login">Signup</Button>
                        </NavLink>
                        </>
                        )}
                    </div>
          
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Nav;