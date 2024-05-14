import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import ShortLogo from '../images/logo-short.png';


function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.status === "Success") {
          localStorage.setItem("user", JSON.stringify(result.data.profile));
          localStorage.setItem("token", result.data.profile.token);
          console.log('hii',result.data.profile);
          login();
          navigate(result.data.profile.role === "admin" ? "/adminlayout" : "/");
        } else if (result.data.status === "Account Blocked. Please contact support.") {
          toast.error("Account Blocked. Please contact support.");
        }  else {
          console.log(result.data.status);
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
      <strong style={{ fontSize: "1.75rem" }}>Login</strong>
      <img
                    src={ShortLogo}
                    alt="Logo"
                    className="profile-img"
                    style={{width:'50px',height:'50px'}}
                  />
        <form onSubmit={handleSubmit}><br/>
          <div className="mb-3">
           
            <MDBInput
      wrapperClass="mb-4"
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{ fontSize: "1.3rem" }}
    />
          </div>
          <div className="mb-3">
           <MDBInput
      wrapperClass="mb-4"
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ fontSize: "1.3rem" }}
    />
          </div>
          <MDBBtn
      type="submit"
      className="mb-4"
      block
      style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
    >
      Login
    </MDBBtn>
   
        </form>
        <Link to='/resetpassword'>Reset Password</Link>
        <p>Don't Have an Account ??</p>
        <Link to="/register">
          <MDBBtn
            className="mb-4"
            block
            style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
          >
            Register
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
export default Login;
