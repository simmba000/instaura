import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = ({ isHide = false }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/promotionsubscribe`, { email });
      setSuccess(true);
      toast.success("You are subscribed for promotions !");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to promotions:", error);
    }
  };

  return (
    <>
      <Wrapper>
        {!isHide && (
          <section className="contact-short">
            <div className="grid grid-two-column">
              <div>
                <h3 className="newText">Ready to get started?</h3>
                <h3 className="newText">Book an appointment with us !!</h3>
              </div>

              <div>
                <Button className="hireme-btn">
                  <NavLink to="/custappointment"> Get Started </NavLink>
                </Button>
              </div>
            </div>
          </section>
        )}
        {/* footer section */}

        <footer>
          <div className="container grid grid-four-column">
            <div className="footer-about">
              <NavLink to="/">
                <img src="./logo.png" alt="my logo img" className="logo1" />
              </NavLink>
            </div>
            <div className="footer-subscribe">
              <h3>Get special offers in your inbox !!</h3>
              {success && (
                <div>
                  Subscribed successfully! You will receive our promotions.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your E-Mail ID"
                  className="emailinput"
                  style={{fontSize:'1.5rem',padding:'0rem',paddingBottom:'1.2rem',paddingTop:'1.2rem'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  value="subscribe"
                  className="emailsubscribe"
                />
              </form>
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="footer-social--icons">
                <div>
                  <NavLink
                    to="https://m.facebook.com/p/Instaura-Unisex-Hair-and-Beauty-Spa-Salon-100064155066829/"
                    target="_blank"
                  >
                    <FaFacebook className="icons" />
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="https://www.instagram.com/instauraspa/"
                    target="_blank"
                  >
                    <FaInstagram className="icons" />
                  </NavLink>
                </div>

                <div>
                  <NavLink
                    to="https://www.youtube.com/@goldenakhomvlogs"
                    target="_blank"
                  >
                    <FaYoutube className="icons" />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <h3>Call Us</h3>
              <h3>+91 60039 81831</h3>
            </div>
          </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p>
                ©{new Date().getFullYear()} instaurasalon.com All Rights
                Reserved
              </p>
              <div>
                <p>PRIVACY POLICY</p>
                <p>TERMS & CONDITIONS</p>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 14rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .newText {
    color: white;
  }

  .footer-bottom--section {
    padding-top: 9rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }
  .emailinput {
    height: 10px;
    width: 253px;
  }

  .emailsubscribe {
    padding: 0.4rem 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer;
