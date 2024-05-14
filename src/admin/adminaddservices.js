import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import "../App.css";
import axios from "axios";

function Adminaddservices() {
  const [category, setCategory] = useState("gents");
  const [selectedService, setSelectedService] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
    setSelectedService("");
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTimeSelect = (event) => {
    setEstimatedTime(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !serviceName) {
      toast.error("Please select sub-category and enter service name");
      return;
    }
    axios
      .post("http://localhost:8000/services", {
        category,
        subCategory: selectedService,
        service: serviceName,
        price: price,
        estimatedTime: estimatedTime,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Service added successfully");
          setSelectedService("");
          setServiceName("");
          setPrice(0);
          setEstimatedTime("");
        } else {
          toast.error("Failed to add service");
        }
      })
      .catch((error) => {
        console.error("Error adding service:", error);
        toast.error("Failed to add service");
      });
  };

  return (
    <div>
      <div className="adminServicemain">
        <strong style={{ fontSize: "1.75rem" ,alignSelf: 'center'}}>Add your Services</strong>
        <div className="adminServicecss">
          <form onSubmit={handleSubmit}>
            <MDBRow className="mb-4">
              <MDBCol>
                <select
                  className="form-select mb-3"
                  onChange={handleCategoryChange}
                  value={category}
                >
                  <option value="gents">Gents</option>
                  <option value="ladies">Ladies</option>
                  <option value="kids">Kids</option>
                </select>
              </MDBCol>
              <MDBCol>
                <select
                  className="form-select mb-3"
                  onChange={handleServiceChange}
                  value={selectedService}
                  label="Sub-Category"
                >
                  <option value="" disabled hidden>
                    Sub-Category
                  </option>
                  {category === "gents" ? (
                    <>
                      <option value="Beard Grooming">Beard Grooming</option>
                      <option value="Haircut & Finish">Haircut & Finish</option>
                      <option value="Hair Texture">Hair Texture</option>
                      <option value="Hand & Feet">Hand & Feet</option>
                      <option value="Hair Treatments">Hair Treatments</option>
                      <option value="Nail Care">Nail Care</option>
                    </>
                  ) : category === "ladies" ? (
                    <>
                      <option value="Hair Styling">Hair Styling</option>
                      <option value="Facials & Rituals">
                        Facials & Rituals
                      </option>
                      <option value="Hair Texture">Hair Texture</option>
                      <option value="Hand & Feet">Hand & Feet</option>
                      <option value="Hair Treatments">Hair Treatments</option>
                      <option value="Nail Care">Nail Care</option>
                    </>
                  ) : (
                    <>
                      <option value="Haircut & Finish">Haircut & Finish</option>
                      <option value="Facials & Rituals">
                        Facials & Rituals
                      </option>
                      <option value="Hair Texture">Hair Texture</option>
                      <option value="Hand & Feet">Hand & Feet</option>
                      <option value="Hair Treatments">Hair Treatments</option>
                      <option value="Nail Care">Nail Care</option>
                    </>
                  )}
                </select>
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="form3Example1"
                  label="Service Name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  // style={{
                  //   margin: "0px 0px 10px !important",
                  //   padding: "0.375rem 2.25rem 0.375rem 0.75rem !important",
                  //   height: "2.7rem !important",
                  // }}
                  className="addserviceAdmin"
                />
              </MDBCol>

              <MDBCol>
                {" "}
                {/* Add a new input field for price */}
                <MDBInput
                  id="form3Example2"
                  label="Price (INR)"
                  // value={price}
                  onChange={handlePriceChange}
                  type="number" // Set the input type to number
                  className="addserviceAdmin"
                />
              </MDBCol>

              <MDBCol>
                {" "}
                {/* Add a new input field for price */}
                <MDBInput
                  id="form3Example2"
                  label="Est. Time (in Minutes)"
                  // value={est.Time}
                  onChange={handleTimeSelect}
                  type="number" // Set the input type to number
                  className="addserviceAdmin"
                />
              </MDBCol>
            </MDBRow>

            <MDBBtn
              type="submit"
              className="mb-4"
              block
              style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1.3em" }}
            >
              Add Service
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminaddservices;
