import React from "react";
import MainLogo from "../images/logo.png";

const InvoiceComponent = ({ data, isVisible }) => {
  console.log(data);
  if (!data) {
    return <p>Loading invoice details...</p>; // or a more elaborate loading component
  }

  return (
    <div
      className="invoice"
      style={{
        display: isVisible ? "block" : "none",
        border: "2px black solid",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Invoice</h1>
      
      <p>Name: {data.name || "Not available"}</p>
      <p>Appointment Date: {data.appointmentdate || "Not available"}</p>
      <p>Address: {data.address || "Not available"}</p>
      <p>Services Selected: {data.services || "Not specified"}</p>
      <p>Total Price: ₹{data.amount || "0"}</p>
      <p>Payment Status: {data.paymentStatus || "Pending"}</p>
      <p>Service Status: {data.serviceStatus || "Pending"}</p>
      ----------------------------------------------------------------------
      <br />
      Digitally Signed by,
      <br />
      Instaura Unisex Salon, Ghy
      <br />
      <br />
      Thankyou, for trusting us. <br />
      See you soon..<br/>
      <img
        src="https://i.postimg.cc/y6bBT0Dx/logo.png"
        alt="logo"
      />
    </div>

  );
};

export default InvoiceComponent;
