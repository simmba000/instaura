import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import LockClockIcon from "@mui/icons-material/LockClock";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import BookingBanner from "../images/Booking-apointment/1.png";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import QuoteDisplay from "../components/Quotes";
import PaymentMethod from "../components/paymentMethodCust";
import { useSelectedServices } from "../contexts/SelectedServicesContext";
import '../App.css';

const Custappointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("gents"); // Default category
  const [services, setServices] = useState([]);
  const [selectedDialogServices, setSelectedDialogServices] = useState([]);
  const [serviceUpdates, setServiceUpdates] = useState(
    location?.state?.selectedServices ? location?.state?.selectedServices : []
  );

  const { selectedServices, toggleService } = useSelectedServices();
  // console.log("jiiii", location.state.selectedServices);

  const [cust_id, setCust_id] = useState();

  const [appointmentdate, setAppointmentdate] = useState();

  const [time, setTime] = useState();
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState();
  const [paymentType, setPaymentType] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponValid, setCouponValid] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [error, setError] = useState(null);
  const handleCouponApply = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/coupons?couponCode=${couponCode}`
      );
      if (response) {
        if (response.data.valid) {
          const coupon = response.data;
          setCoupon(coupon);
          const currentDate = new Date().toISOString().split("T")[0];
          if (
            currentDate >= coupon.coupon.activeDate &&
            currentDate <= coupon.coupon.expiryDate
          ) {
            console.log("date valid");
            setCouponApplied(true);
            setCouponValid(true);
            setCouponDiscount(coupon.coupon.couponDiscount);
          } else {
            setCouponValid(false);
            setCouponApplied(false);
          }
          
        } else {
          setCouponValid(false);
        }
      } else {
        setCouponValid(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  /// Function to calculate the total price based on selected services
  const getTotalPrice = () => {
    // Implement your logic to calculate the total price here
    // For example, summing up the prices of selected services
    let totalPrice = 0;
    serviceUpdates.forEach((service) => {
      totalPrice += service.price;
    });
    return totalPrice;
  };

  // Function to calculate total amount with discount applied
  const calculateTotalAmount = () => {
    // Assuming you have a variable to store the discount percentage, e.g., couponDiscount
    const discountPercentage = couponDiscount / 100; // Convert percentage to decimal

    // Calculate total amount after discount
    const totalPriceBeforeDiscount = getTotalPrice();
    const discountedAmount =
      totalPriceBeforeDiscount * (1 - discountPercentage);

    // Return the total amount after applying discount
    return discountedAmount.toFixed(2); // Assuming you want to keep 2 decimal places
  };

  // Call this function to calculate amountValue

  // Function to send confirmation email after successful booking
const sendConfirmationEmail = async (customerEmail, bookingDetails) => {
  try {
    const response = await axios.post("http://localhost:8000/sendBookingConfirmationEmail", {
      customerEmail,
      bookingDetails,
    });
    console.log(response.data); // Log the response (optional)
    // Handle success (e.g., show a success message to the user)
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Handle error (e.g., show an error message to the user)
  }
};


  const handleFinalSubmit = (e) => {
    e.preventDefault();

    // Assuming cust_id is available in the response from '/myaccount' route
    const custId = cust_id;
    const genderValue = gender;
    const appointmentDateValue = appointmentdate;
    const selectedServicesNames = serviceUpdates.map(
      (service) => service.service
    );
    const selectedServicesCategories = serviceUpdates.map(
      (service) => service.category
    );
    const timeValue = time;
    const messageValue = message;
    const amountValue = calculateTotalAmount(); // Need to be total after calculating discount
    const paymentTypeValue = paymentType; // Need to get the value from PaymentMethod component
    const paymentStatusValue = "Not Completed";
    const serviceStatusValue = "Service Pending";

    const appointmentDetails = {
      appointmentDate: appointmentdate,
      appointmentTime: time,
      servicesBooked: serviceUpdates
        .map((service) => service.service)
        .join(", "),
      totalPrice: calculateTotalAmount(), // Need to be total after calculating discount
      paymentStatus: "Pending",
      serviceStatus: "Booked",
    };

    axios
      .post("http://localhost:8000/bookings", {
        cust_id: custId,
        gender: genderValue,
        appointmentdate: appointmentDateValue,
        services: selectedServicesNames,
        categories: selectedServicesCategories,
        time: timeValue,
        message: messageValue,
        amount: amountValue,
        paymentType: paymentTypeValue,
        paymentStatus: paymentStatusValue,
        serviceStatus: serviceStatusValue,
      })
      .then((result) => {
        console.log(result);
        sendConfirmationEmail(userEmail, appointmentDetails);
        navigate("/bookingconfirmation", { state: appointmentDetails });
        toast.success("Appointment booked successfully!");
      })

      .catch((err) => {
        console.error(err);
        toast.error("Failed to book appointment");
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedToken = localStorage.getItem("user");
        setToken(storedToken);

        if (!storedToken) {
          navigateToLogin();
          return;
        }

        const parseUser = JSON.parse(storedToken);

        const response = await axios.get(
          `http://localhost:8000/myaccount?email=${parseUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${parseUser.token}`,
            },
          }
        );

        if (response) {
          const { _id, name, email, address, phone } = response.data;
          setCust_id(_id);
          setUserName(name);
          setUserEmail(email);
          setUserAddress(address);
          setUserPhone(phone);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          // Token expired, show alert
          alert("Your session has expired. Please log in again.");
        } else {
          // Other error occurred
          setError(error.message);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const navigateToLogin = () => {
    if (!toast.isActive("loginToast")) {
      toast.error("Please login to book your appointment", { toastId: "loginToast" });
    }
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };


  const handleDateChange = (event) => {
    setAppointmentdate(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 30);
  const maxDate = futureDate.toISOString().split("T")[0];

  const handleServiceToggle = (service) => {
    toggleService(service); // Remove from selectedServices context
    setServiceUpdates(serviceUpdates.filter((s) => s._id !== service._id)); // Remove from serviceUpdates
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    // Set initially selected services in the dialog

    setSelectedDialogServices(
      serviceUpdates ? serviceUpdates?.map((service) => service._id) : []
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDialogCheckboxChange = (serviceId, service) => {
    const isChecked = selectedDialogServices?.includes(serviceId);

    if (isChecked) {
      // Remove service if already selected
      setSelectedDialogServices(
        selectedDialogServices.filter((id) => id !== serviceId)
      );
      setServiceUpdates((prevServices) =>
        prevServices.filter((serv) => serv._id !== serviceId)
      );
    } else {
      console.log(selectedDialogServices.length);
      // Add service if not already selected
      setSelectedDialogServices([...selectedDialogServices, serviceId]);
      setServiceUpdates([...serviceUpdates, service]);
    }
  };

  // Modify handleDialogSubmit to handle multiple services
  const handleDialogSubmit = () => {
    // Remove deselected services from serviceUpdates
    setServiceUpdates(
      serviceUpdates?.filter((service) =>
        selectedDialogServices?.includes(service._id)
      )
    );

    // Remove deselected services from selectedServices context
    selectedServices?.forEach((service) => {
      if (!selectedDialogServices?.includes(service._id)) {
        toggleService(service);
      }
    });

    // Close the dialog
    handleCloseDialog();
  };

  // Function to calculate total price before discount
  const getTotalPriceBeforeDiscount = () => {
    return serviceUpdates?.reduce((total, service) => total + service.price, 0);
  };

  const totalEstimatedTime = serviceUpdates?.reduce((total, service) => {
    return total + service.estimatedTime;
  }, 0);

  const handlePaymentTypeChange = (selectedPaymentType) => {
    setPaymentType(selectedPaymentType);
  };

  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  const appointmentdateObject = new Date(appointmentdate);
  const isToday = appointmentdateObject.getDate() === today.getDate();

  const startTime = isToday ? Math.max(currentHour, 10) : 10;
  const endTime = 20;
  const timeSlots = [];

  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour < 10 ? "0" + hour : hour}:${
        minute === 0 ? "00" : "30"
      } ${hour < 12 ? "AM" : "PM"}`;
      const date = new Date(
        appointmentdateObject.getFullYear(),
        appointmentdateObject.getMonth(),
        appointmentdateObject.getDate(),
        hour,
        minute
      );

      const isFuture = date > today || (isToday && date > today);

      if (isFuture) {
        timeSlots.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
  }

  useEffect(() => {
    if (openDialog) {
      fetchServices();
    }
  }, [openDialog, selectedCategory]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/services?category=${selectedCategory}`
      );
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          boxShadow: "rgb(219, 213, 213) 4px 4px 6px 3px",
          width: "80%",
          height: "100%",
          justifyContent: "center",
          margin: "auto",
          marginTop: "20px",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        {/* <h3 style={{color:'rgb(4 71 95)',fontSize:'18px'}}><strong>Complete Your Appointment With Us !!</strong></h3> */}
        <div>
          <img src={BookingBanner} alt="Booking banner" className="" />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <form>
          <MDBRow className="mb-4">
          <MDBCol>
          <MDBInput
              wrapperClass="mb-4"
              id="formControlDisabled"
              label="Name"
              type="text"
              value={userName}
              required
              disabled
              labelClass="labelFontSize"
              style={{ fontSize: "14px" ,backgroundColor:'white',borderRadius: "5px"}}
            />
          </MDBCol>
          <MDBCol>
                <MDBInput
                  wrapperClass="mb-4"
                  type="email"
                  id="form6Example5"
                  label="Email"
                  value={userEmail}
                  required
                  disabled
                  labelClass="labelFontSize"
                  style={{ fontSize: "14px",backgroundColor:'white',borderRadius: "5px" }}
                />
              </MDBCol>
          </MDBRow>
            
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput
                  wrapperClass="mb-4"
                  type="tel"
                  id="form6Example6"
                  label="Phone"
                  value={userPhone}
                  disabled
                  required
                  labelClass="labelFontSize"
                  style={{ fontSize: "14px",backgroundColor:'white',borderRadius: "5px" }}
                />
              </MDBCol>&nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
              <MDBCol>
              <label>
                <p style={{fontSize:'16px'}}>Gender : &nbsp; &nbsp;
                <label style={{ fontSize: "14px" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                      />
                      Female
                    </label>&nbsp; &nbsp;  &nbsp;  &nbsp;
                    <label style={{ fontSize: "14px" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
                      />
                      Male
                    </label>&nbsp; &nbsp;  &nbsp; &nbsp;
                    <label style={{ fontSize: "14px" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={handleGenderChange}
                      />
                      Other
                    </label>
                     </p>
                </label>
            </MDBCol>
            <MDBCol >
              <label>
                {" "}
              <p style={{ fontSize: "16px" }}>Pick your Date: &nbsp; &nbsp;
                
                <input
                  style={{ padding: "0.4rem 1rem", borderRadius: "5px",fontSize:'14px' }}
                  type="date"
                  value={appointmentdate}
                  onChange={handleDateChange}
                  min={today.toISOString().split("T")[0]} // Set min to today's date
                  max={maxDate} // Set max to 30 days from now
                /></p> 
              </label>
            </MDBCol>
            </MDBRow>
            <MDBInput
              wrapperClass="mb-4"
              id="form6Example4"
              label="Address"
              value={userAddress}
              disabled
              labelClass="labelFontSize"
              style={{ fontSize: "14px" ,backgroundColor:'white',borderRadius: "5px"}}
            />
           
            
            <AddCircleOutlineIcon />
            <IconButton type="button" onClick={handleOpenDialog} style={{fontSize:'16px'}}>
              {" "}
              Add Service
            </IconButton>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Pick more services !!</DialogTitle>
              <DialogContent>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <select
                      className="form-select mb-3"
                      onChange={handleCategoryChange}
                      value={selectedCategory}
                    >
                      <option value="gents">Gents</option>
                      <option value="ladies">Ladies</option>
                      <option value="kids">Kids</option>
                    </select>
                    {services.map(
                      (service) =>
                        service.category === selectedCategory && (
                          <div key={service._id}>
                            <input
                              type="checkbox"
                              id={service._id}
                              checked={selectedDialogServices?.includes(
                                service._id
                              )}
                              onChange={() =>
                                handleDialogCheckboxChange(service._id, service)
                              }
                            />

                            <label htmlFor={service._id}>
                              {service.service}
                            </label>
                          </div>
                        )
                    )}
                  </MDBCol>
                </MDBRow>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogSubmit}>Update</Button>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
            <MDBCol >
              <h3 style={{fontSize:'16px'}}><AssignmentTurnedInIcon /> Selected Services:</h3>
              <ul
                className="toBeAssigned"
                style={{ display: "flex", flexDirection: "row",fontSize:'14px' }}
              >
                {/* Only render if the service is selected */}
                {serviceUpdates?.map((service) => (
                  <li key={service._id}>
                    <input
                      type="checkbox"
                      id={service._id}
                      name={service.service}
                      checked={true} // Assuming all services are selected
                      onChange={() => handleServiceToggle(service)}
                      required
                    />
                    <label htmlFor={service._id}>{service.service}</label>
                  </li>
                ))}
              </ul>
            </MDBCol>
            <br />
            <MDBCol style={{ fontSize: "16px" }}>
              <TimerOutlinedIcon /> {totalEstimatedTime} Mins Est. Time To
              Complete
            </MDBCol>
            <br />
            <MDBCol style={{ fontSize: "16px" }}>
              <LockClockIcon /> Book your available time-slot: &nbsp;
              <select value={time} onChange={handleTimeChange} style={{borderRadius: "8px ",border:'3px black'}} required>
                <option value="">Select Time</option>
                {timeSlots}
              </select>
            </MDBCol>
            <br />
            <MDBInput
              wrapperClass="mb-4"
              textarea
              id="form6Example7"
              rows={4}
              label="Additional information or message"
              value={message} 
              onChange={handleMessageChange} 
              style={{ fontSize: "14px",borderRadius: "5px" }}
              labelClass="labelFontSize"
            />
            <div style={{display:'flex',alignItems:'center'}}>
            <br />
            <PaymentMethod onPaymentTypeChange={handlePaymentTypeChange} />
            
            <div>
            <div
              style={{
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                boxShadow: "rgb(219, 213, 213)  4px 4px 6px 3px",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "20px",
                fontSize:'14px',
                marginLeft:'0rem'
              }}
            >
              <div
                style={{ width: "400px", maxWidth: "1200px", padding: "1em" }}
              >

<div>
             <div
              style={{
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                padding: "5px",
                marginLeft:'0rem'
              }}
            >
              <div style={{ marginTop: "14px" }}>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="Apply Coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ fontSize: "14px" }}
                />
              </div>

              {!couponApplied ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ padding: "0px", margin: "15px",fontSize:'14px' }}
                  onClick={handleCouponApply}
                  disabled={couponApplied}
                >
                  Apply !!
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "0px", margin: "15px",fontSize:'14px' }}
                    disabled={!couponApplied}
                  >
                    Applied !!
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "0px", margin: "15px" }}
                    onClick={() => {
                      setCouponCode("");
                      setCoupon(null);
                      setCouponApplied(false);
                      setCouponDiscount("");
                    }}
                  >
                    <BackspaceIcon />
                  </Button>
                </>
              )}
            </div>
            {!couponValid && !couponApplied && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <p style={{ color: "red", fontSize: "14px" }}>
                  Coupon is expired or invalid !!
                </p>
              </div>
            )}
             </div>

                {serviceUpdates?.map((service) => (
                  <div key={service._id}>
                    {service.service} - {service.category} : ₹
                    {service.price.toFixed(2)}
                  </div>
                ))}
                <br />
                Amount before Discount: ₹
                {getTotalPriceBeforeDiscount()?.toFixed(2)} <br />
                Discount % : {couponDiscount}%<br />
                <h3 style={{fontSize:'18px'}}>
                  Total Amount:{" "}
                  {couponApplied ? (
                    <>
                      <span style={{ textDecoration: "line-through" }}>
                        ₹{getTotalPriceBeforeDiscount().toFixed(2)}
                      </span>{" "}
                      ₹{calculateTotalAmount()}
                    </>
                  ) : (
                    `₹${calculateTotalAmount()}`
                  )}{" "}
                </h3>
                {serviceUpdates?.length} Service Selected !! <br/><br/>

                <MDBBtn
              className="mb-4"
              type="submit"
              block
              style={{ backgroundColor: "rgb(4, 71, 95)", fontSize: "1.5rem" ,width:'20rem'}}
              onClick={handleFinalSubmit}
            >
              Book Appointment
            </MDBBtn>
              </div>
              
            </div>
            
              </div>
            </div>
         

         
            
          </form>
        </div>
      </div>
      <QuoteDisplay />
      <Footer isHide={true} />
    </div>
  );
};

export default Custappointment;
