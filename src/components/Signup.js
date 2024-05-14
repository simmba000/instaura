import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShortLogo from '../images/logo-short.png';

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", {
        name,
        email,
        password,
        address,
        age,
        phone,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <strong style={{ fontSize: "1.75rem" }}>Register</strong><br/>
        <img
                    src={ShortLogo}
                    alt="Logo"
                    className="profile-img"
                    style={{width:'50px',height:'50px'}}
                  /> <br/>
        <Link to='/login'><ArrowBackIcon/></Link><br/><br/>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <MDBInput
              wrapperClass="mb-4"
              label=" Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: "1.3rem" }}
            />
          </div>

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
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ fontSize: "1.3rem" }}
            />
          </div>

          <div className="mb-3">
            <MDBInput
              wrapperClass="mb-4"
              label="Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ fontSize: "1.3rem" }}
            />
          </div>

          <div className="mb-3">
            <MDBInput
              wrapperClass="mb-4"
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
            Register
          </MDBBtn>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login">
          <MDBBtn
            className="mb-4"
            block
            style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
          >
            Login
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
export default Signup;
