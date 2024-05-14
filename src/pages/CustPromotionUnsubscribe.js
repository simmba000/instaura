import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import "../App.css";
import ShortLogo from "../images/logo-short.png";
import axios from "axios";
import { toast } from "react-toastify";

const CustPromotionUnsubscribe = () => {
  const [email, setEmail] = useState("");

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post("http://localhost:8000/unsubscribePromotion", { email });

      if (response.data.message === "This email is already not subscribed") {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setEmail("");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("This email is already not subscribed");
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center bg-white vh-80">
        <div
          className="bg-white p-3 rounded w-25"
          style={{ boxShadow: "2px 2px 2px 2px gray", marginTop: "3rem",textAlign:'center' }}
        >
          <strong style={{ fontSize: "1.75rem" }}>
            Unsubscribe Promotion Mails
          </strong>
          <img
            src={ShortLogo}
            alt="Logo"
            className="profile-img"
            style={{ width: "50px", height: "50px",margin:'auto',borderRadius:'3px' }}
          />

          <div className="" style={{ paddingTop: "10px" }}>
            <div className="custResetcss">
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "1.3rem" }}
              />
              <MDBBtn
               onClick={handleUnsubscribe}
                className="mb-4"
                block
                style={{
                  backgroundColor: "rgb(4 71 95)",
                  fontSize: "1em",
                  }}
              >
                Unsubscribe
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustPromotionUnsubscribe;
