import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./navbar";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./logo.png" alt="my logo img" className="logo1" />
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo1 {
    width: 150px; 
    height: auto;
    border-radius:8px; 
  }
`;

export default Header;
