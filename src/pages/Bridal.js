import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BridalBanner from "../images/Bridal/Bridal Makeup.png";
import Bridal1 from "../images/Bridal/1.png";
import Bridal2 from "../images/Bridal/2.png";
import Bridal3 from "../images/Bridal/3.png";
import "../App.css";
import PhoneIcon from '@mui/icons-material/Phone';
const Bridal = () => {
  return (
    <div>
      <Header />
      <img src={BridalBanner} alt="Bridal Banner" />

      <div style={{ marginTop: "6rem" }}>
        <div className="bridalGrid">
          <div style={{ width: "40%", textAlign: "-webkit-center" }}>
            <img
              src={Bridal1}
              alt="Bridal"
              style={{ height: "250px", width: "400px", borderRadius: "8px" }}
            />
          </div>
          <div style={{ width: "60%", textAlign: "left" }}>
            <p
              style={{
                fontSize: "20px",
                color: "rgb(4, 71, 95)",
                marginTop: "4rem",
              }}
            >
              {" "}
              <strong>The Next Gen Bridal Look</strong>
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "rgb(4, 71, 95)",
                textAlign: "left",
              }}
            >
              Welcome to Instaura Beauty Salon, where we specialize in creating
              the perfect bridal look for your special day. Our team of expert
              makeup artists is dedicated to making you look and feel your
              absolute best as you walk down the aisle. With years of experience
              in the bridal industry, our staff has honed their skills to
              perfection, ensuring that every bride receives personalized
              attention and a stunning makeup application tailored to her unique
              style and preferences.
            </p>
          </div>
        </div>

        <div className="bridalGrid" style={{ marginTop: "4rem" }}>
          <div style={{ width: "60%", textAlign: "center" }}>
            <p
              style={{
                fontSize: "16px",
                color: "rgb(4, 71, 95)",
                textAlign: "right",
                marginTop: "6rem",
                marginLeft: "2rem",
              }}
            >
              At Instaura Beauty Salon, we understand that your wedding day is
              one of the most important days of your life, which is why we go
              above and beyond to exceed your expectations. From flawless
              airbrush makeup to intricate bridal hairstyles, our talented team
              is committed to delivering impeccable results that enhance your
              natural beauty and leave you feeling radiant on your big day.
              Whether you envision a soft and romantic look or something bold
              and glamorous, our artists have the expertise to bring your vision
              to life with precision and care.
            </p>
          </div>
          <div style={{ width: "40%", textAlign: "-webkit-center" }}>
            <img
              src={Bridal2}
              alt="Bridal"
              style={{ height: "250px", width: "400px", borderRadius: "8px" }}
            />
          </div>
        </div>

        <div className="bridalGrid" style={{ marginTop: "4rem" }}>
          <div style={{ width: "40%", textAlign: "-webkit-center" }}>
            <img
              src={Bridal3}
              alt="Bridal"
              style={{ height: "250px", width: "400px", borderRadius: "8px" }}
            />
          </div>
          <div style={{ width: "60%", textAlign: "center" }}>
            <p
              style={{
                fontSize: "16px",
                color: "rgb(4, 71, 95)",
                textAlign: "left",  marginTop: "6rem",
              }}
            >
              Ready to start planning your bridal makeup? Contact us today to
              schedule a consultation with one of our skilled makeup artists. We
              offer convenient appointment options and personalized service to
              ensure that your bridal beauty experience is stress-free and
              enjoyable. Give us a call to discuss your bridal makeup needs and
              let us help you look and feel absolutely stunning on your wedding
              day. Trust Instaura Beauty Salon to make your bridal beauty dreams
              a reality.
            </p>
          </div>
        </div>
        
        <div>
           <p style={{fontSize:'20px',textAlign:'center', color: "rgb(4, 71, 95)",}}> 
           <PhoneIcon sx={{ fontSize: '22px' }}/> &nbsp;
           Call us at <strong>
           +91 60039 81831
           </strong></p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bridal;
