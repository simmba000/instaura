import React,{useState,useEffect} from "react";
import AdminSidebar from "./adminsidebar";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "./adminnavbar";
import axios from "axios";
function Adminlayout() {

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    

    if (token) {
      const parsedUser = JSON.parse(token);
      setUserData(parsedUser);
      console.log('hoo',parsedUser);
      if (parsedUser.role !== "admin") {
        navigate("/login"); 
         return;
      }

      axios
        .get(`http://localhost:8000/myaccount?email=${parsedUser.email}`, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <MainHeader>
        <NavLink to="/">
          <img src="./logo.png" alt="my logo img" className="logo1" />
        </NavLink>
        <AdminNavbar />
      </MainHeader>
      <div
        style={{ display: "flex", justifyContent: "flex-start", gap: "1em" }}
      >
        <div style={{ height: "100vh" }}>
          <AdminSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
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
    border-radius: 8px;
  }
`;

export default Adminlayout;
