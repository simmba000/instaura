import React, { useState, useEffect } from "react";
import GenderNav from "./GenderNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KidsBanner from "../images/Kids-services/1.png";
import KidsHairServices from "../images/Kids-services/kids_icon-1.png";
import KidsSkinServices from "../images/Kids-services/kids_icon-2.png";
import "../App.css";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelectedServices } from "../contexts/SelectedServicesContext";
import { TimerOutlined } from "@mui/icons-material";

// Component to display individual selected service
const SelectedService = ({ name, price }) => (
  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
    {name}: ₹{price.toFixed(2)}
  </div>
);

const Kids = () => {
  const [services, setServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const { selectedServices, toggleService } = useSelectedServices();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8000/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      console.log(data.services);
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const getServicesByCategory = (category, subCategory) => {
    return services.filter(
      (service) =>
        service.category === category && service.subCategory === subCategory
    );
  };

  useEffect(() => {
    // Calculate total price whenever selectedServices change
    const price = selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
    setTotalPrice(price);
  }, [selectedServices]);

  const handleProceedToBook = () => {
    // Navigate to the /custappointment page with selected services in URL query parameter
    navigate("/custappointment", {
      state: { selectedServices: selectedServices },
    });
  };

  return (
    <div>
      <Header />
      <GenderNav />
      <div>
        <img src={KidsBanner} alt="Kids banner" className="" />
      </div>
      <br />
      <div style={{ display: "flex", gap: "1.4em" }}>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ paddingTop: "15px" }}>
            <img
              src={KidsHairServices}
              alt="kids hair"
              className=""
              style={{ height: "180px", width: "180px" }}
            />
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {" "}
              <strong>Hair Services</strong>
            </p>
          </div>
        </div>
        {/* Hair Services Section */}
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Haircut & Finish
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Haircut & Finish").map(
              (service) => (
                <li
                  key={service._id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <input
                      type="checkbox"
                      id={service._id}
                      name={service.service}
                      checked={selectedServices.some(
                        (s) => s._id === service._id
                      )}
                      onChange={() => toggleService(service)}
                    />
                    <label htmlFor={service._id}>
                      &nbsp; {service.service} <br /> &nbsp;
                      <TimerOutlined />
                      {service.estimatedTime}Mins
                    </label>
                  </div>
                  <div style={{ textAlign: "right" }}>(₹{service.price})</div>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Hair Texture
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Hair Texture").map((service) => (
              <li
                key={service._id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <input
                    type="checkbox"
                    id={service._id}
                    name={service.service}
                    checked={selectedServices.some(
                      (s) => s._id === service._id
                    )}
                    onChange={() => toggleService(service)}
                  />
                  <label htmlFor={service._id}>
                    &nbsp; {service.service} <br /> &nbsp;
                    <TimerOutlined />
                    {service.estimatedTime}Mins
                  </label>
                </div>
                <div style={{ textAlign: "right" }}>(₹{service.price})</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Hair Treatments
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Hair Treatments").map((service) => (
              <li
                key={service._id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <input
                    type="checkbox"
                    id={service._id}
                    name={service.service}
                    checked={selectedServices.some(
                      (s) => s._id === service._id
                    )}
                    onChange={() => toggleService(service)}
                  />
                  <label htmlFor={service._id}>
                    &nbsp; {service.service} <br /> &nbsp;
                    <TimerOutlined />
                    {service.estimatedTime}Mins
                  </label>
                </div>
                <div style={{ textAlign: "right" }}>(₹{service.price})</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />

      <div style={{ display: "flex", gap: "1.4em" }}>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ paddingTop: "15px" }}>
            <img
              src={KidsSkinServices}
              alt="kids skin"
              className=""
              style={{ height: "180px", width: "180px" }}
            />
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              {" "}
              <strong>Skin & Body</strong>
            </p>
          </div>
        </div>
        {/* Skin & Body Services Section */}
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Facials & Rituals
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Facials & Rituals").map(
              (service) => (
                <li
                  key={service._id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <input
                      type="checkbox"
                      id={service._id}
                      name={service.service}
                      checked={selectedServices.some(
                        (s) => s._id === service._id
                      )}
                      onChange={() => toggleService(service)}
                    />
                    <label htmlFor={service._id}>
                      &nbsp; {service.service} <br /> &nbsp;
                      <TimerOutlined />
                      {service.estimatedTime}Mins
                    </label>
                  </div>
                  <div style={{ textAlign: "right" }}>(₹{service.price})</div>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Hand & Feet
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Hand & Feet").map((service) => (
              <li
                key={service._id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <input
                    type="checkbox"
                    id={service._id}
                    name={service.service}
                    checked={selectedServices.some(
                      (s) => s._id === service._id
                    )}
                    onChange={() => toggleService(service)}
                  />
                  <label htmlFor={service._id}>
                    &nbsp; {service.service} <br /> &nbsp;
                    <TimerOutlined />
                    {service.estimatedTime}Mins
                  </label>
                </div>
                <div style={{ textAlign: "right" }}>(₹{service.price})</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="servicesCards">
          <div className="serviceHeading">
            <strong style={{ fontSize: "16px", color: "rgb(4, 71, 95)" }}>
              Nail Care
            </strong>
          </div>
          <ul className="checkbox-list">
            {getServicesByCategory("kids", "Nail Care").map((service) => (
              <li
                key={service._id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <input
                    type="checkbox"
                    id={service._id}
                    name={service.service}
                    checked={selectedServices.some(
                      (s) => s._id === service._id
                    )}
                    onChange={() => toggleService(service)}
                  />
                  <label htmlFor={service._id}>
                    &nbsp; {service.service} <br /> &nbsp;
                    <TimerOutlined />
                    {service.estimatedTime}Mins
                  </label>
                </div>
                <div style={{ textAlign: "right" }}>(₹{service.price})</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedServices?.length > 0 && (
        <div
          style={{
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            boxShadow: "rgb(197, 190, 190) 0px 3px 10px 1px",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <div style={{ width: "400px", maxWidth: "1200px", padding: "1em" }}>
            {/* Render selected services names and prices */}
            {selectedServices.map((service, index) => (
              <SelectedService
                key={service._id}
                name={service.service}
                price={service.price}
              />
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              {/* Render total price only if at least one service is selected */}
              <div style={{ marginTop: "10px" }}>
                <h3 style={{ fontSize: "16px" }}>Total Price:</h3>
                <div style={{ fontSize: "18px" }}>₹{totalPrice.toFixed(2)}</div>
              </div>

              {/* Proceed to book button */}
              <div
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  margin: "auto",
                  marginRight: "0.3rem",
                }}
              >
                <button className="bookingButton" onClick={handleProceedToBook}>
                  Proceed to Book
                  <PanToolAltIcon style={{ width: "1.5em", height: "1.5em" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Kids;
