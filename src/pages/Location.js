import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Location = () => {
  return (
    <div>
      <Header />
      <iframe
        title="Instaura Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.4009359881024!2d91.7956504742506!3d26.11846727712951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5fb389e8ee61%3A0xee21f86f8f45efcf!2sInstaura%20Unisex%20Hair%20and%20Beauty%20Spa%20Salon!5e0!3m2!1sen!2sin!4v1709618706634!5m2!1sen!2sin"
        width="100%"
        height="310"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div style={{marginLeft:'5rem',marginTop:'3rem',boxShadow:'rgb(219, 213, 213) 4px 4px 6px 3px',width: "fit-content",
      borderRadius:'3px',padding:'1rem',color:'rgb(4 71 95)'}}>
      <h3><strong>Locate Us</strong></h3>
      <h4>Instaura Unisex Hair and Beauty Spa Salon</h4>
      <h4 ><strong>Address:</strong></h4>
      <h5>
        1st Floor, Lakhimandir Complex,<br></br>
        Beltola Tiniali, Guwahati, Assam 781028
      </h5>
      </div>
      <Footer />
    </div>
  );
};

export default Location;
