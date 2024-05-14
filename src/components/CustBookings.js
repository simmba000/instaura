import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import { Button, IconButton, Input } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";
import RateReviewIcon from "@mui/icons-material/RateReview";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { createRoot } from "react-dom/client";
import InvoiceComponent from "../components/InvoiceComponent"; // Icon for printing invoice
import { Close, Edit, Upload } from "@mui/icons-material";
import { toast } from "react-toastify";

const CustBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [nameMapping, setNameMapping] = useState({});
  const [addressMapping, setAddressMapping] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [reviewPostedMap, setReviewPostedMap] = useState({});
  const [isReviewEditing, setIsReviewEditing] = useState({});
  const [userDetails, setUserDetails] = useState({ name: "", address: "" });
  const [reviewText, setReviewText] = useState({});
  const [rating, setRating] = useState({});
  const [custId, setCustId] = useState("");
  const [postedRatings, setPostedRatings] = useState({});
  const [postedReviewTexts, setPostedReviewTexts] = useState({});
  const [isReviewPosted, setIsReviewPosted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchBookingsAndUsers = async () => {
        try {
          const bookingsResponse = await axios.get(
            "http://localhost:8000/mybookings",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setBookings(bookingsResponse.data);

          // Fetch user details perhaps as a separate request or included in the bookings response
          const usersResponse = await axios.get(
            "http://localhost:8000/getUsers",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const nameMap = {};
          const addressMap = {};
          usersResponse.data.forEach((user) => {
            nameMap[user._id] = user.name;
            addressMap[user._id] = user.address;
          });
          setNameMapping(nameMap);
          setAddressMapping(addressMap);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookings and user details:", error);
          setLoading(false);
        }
      };

      fetchBookingsAndUsers();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/mybookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Bookings fetched:", response.data);
          setBookings(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          if (error.response && error.response.status === 401) {
            // Token expired, show alert
            alert("Your session has expired. Please log in again.");
          } else {
            // Other error occurred
            setError(error.message);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    fetchReviews();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    const storedToken = localStorage.getItem("user");
    setToken(storedToken);

    const parseUser = JSON.parse(storedToken);
    try {
      const res = await axios.put(
        `http://localhost:8000/mybookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedData = res.data;
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, serviceStatus: "Service Cancelled" }
            : booking
        )
      );
     

      setBookingDetails(updatedData);

      sendCancellationEmail(parseUser.email, updatedData);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const sendCancellationEmail = async (
    customerEmail,
    updatedBookingDetails
  ) => {
    console.log(customerEmail, updatedBookingDetails);
    const { amount, appointmentdate, services, serviceStatus } =
      updatedBookingDetails;

    const allbookingDetails = {
      amount,
      appointmentdate,
      services,
      serviceStatus,
    };

    const finalBookingsend = allbookingDetails;

    const user = localStorage.getItem("user");
    try {
      const response = await axios.post(
        "http://localhost:8000/sendBookingCancellationEmail",
        {
          customerEmail,
          bookingDetails: finalBookingsend,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };

  const handleOpenDialog = (bookingId) => {
    setOpenDialog(true);
    setCurrentBookingId(bookingId._id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmCancel = () => {
    if (currentBookingId) {
      handleCancelBooking(currentBookingId);
    }
    setOpenDialog(false);
  };

  const handleShowInvoice = (booking) => {
    const data = {
      name: nameMapping[booking.cust_id] || "Unknown Name", // Defaulting to 'Unknown Name' if not found
      address: addressMapping[booking.cust_id] || "Unknown Address", // Defaulting to 'Unknown Address' if not found
      services: booking.services.join(", "),
      appointmentdate: booking.appointmentdate,
      amount: booking.amount,
      paymentStatus: booking.paymentStatus,
      serviceStatus: booking.serviceStatus,
    };

    setInvoiceData(data);
    setShowInvoice(true);
  };

  const printInvoice = () => {
    if (!invoiceData) return;

    const element = document.createElement("div");
    const root = createRoot(element);
    root.render(<InvoiceComponent data={invoiceData} isVisible={true} />);

    setTimeout(() => {
      const printWindow = window.open("", "PRINT", "height=600,width=800");
      printWindow.document.write("<html><head><title>Invoice</title>");
      printWindow.document.write("</head><body>");
      printWindow.document.write(element.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();

      printWindow.print();
      printWindow.close();
    }, 500);
  };

  useEffect(() => {
    if (invoiceData) {
      printInvoice();
    }
  }, [invoiceData]);

  const handleRatingChange = (bookingId, value) => {
    setRating((prev) => ({ ...prev, [bookingId]: value }));
  };

  const handleReviewChange = (bookingId, text) => {
    setReviewText((prev) => ({ ...prev, [bookingId]: text }));
  };

  const handlePostReview = async (bookingId) => {
    const token = localStorage.getItem("token");

    // Get the cust_id from the corresponding booking
    const booking = bookings.find((booking) => booking._id === bookingId);
    const custId = booking ? booking.cust_id : null;

    try {
      await axios.post(
        "http://localhost:8000/reviews",
        {
          booking_id: bookingId,
          cust_id: custId,
          reviewText: reviewText[bookingId] || "",
          reviewDate: new Date().toISOString(),
          rating: rating[bookingId] || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviewPostedMap((prev) => ({ ...prev, [bookingId]: true }));
      setIsReviewEditing((prev) => ({ ...prev, [bookingId]: false }));
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };

  const handleEditReview = (bookingId) => {
    setIsReviewEditing((prev) => ({ ...prev, [bookingId]: true }));
  };

  const handleCancelEdit = (bookingId) => {
    setIsReviewEditing((prev) => ({ ...prev, [bookingId]: false }));
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reviews/");
      const newRatings = {};
      const newReviewTexts = {};
      const newReviewPostedMap = {};

      response.data.reviews.forEach((item) => {
        newRatings[item.booking_id] = item.rating.toString(); // Make sure ratings are strings if your comparisons rely on strings
        newReviewTexts[item.booking_id] = item.reviewText; // Assuming reviewText is the correct key
        newReviewPostedMap[item.booking_id] = true;
      });

      setRating(newRatings); // Update the state
      setReviewText(newReviewTexts); // Ensure this state is updated correctly
      setReviewPostedMap(newReviewPostedMap);
      console.log("Updated Ratings:", newRatings); // Check the updated state
      console.log("Updated Review Texts:", newReviewTexts);
    } catch (error) {
      console.error("Fetching reviews error:", error);
    }
  };

  useEffect(() => {
    setBookings();
    fetchReviews();
  }, []); // Dependency array should ensure fetchReviews is called correctly

  const handleUpdateReview = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/reviews/${bookingId}`,
        {
          reviewText: reviewText[bookingId] || "",
          rating: rating[bookingId] || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsReviewEditing((prev) => ({ ...prev, [bookingId]: false }));
      // Optionally, you can fetch reviews again to update the UI after the review is updated
      fetchReviews();
      toast.success("Review Updated Successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const clearSorting = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const filterBookingsByDate = (booking) => {
    if (!startDate || !endDate) return true;
    const bookingDate = new Date(booking.appointmentdate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return bookingDate >= start && bookingDate <= end;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div>
        <h3>
          <p style={{ paddingLeft: "60px",color:'rgb(4 71 95)' }}>
            <strong>My Bookings</strong>
          </p>
        </h3>
        <div className="custBookings">
          <p
            style={{
              textAlign: "right",
              marginRight: "10em",
              color: "#4f4f4f",
            }}
          >
            Sort By Date:
            <Input
              type="date"
              value={startDate || ""}
              onChange={handleStartDateChange}
              style={{
                padding: "0rem",
                borderColor: "#4f4f4f",
                margin: "10px",
              }}
            />
            To
            <Input
              type="date"
              value={endDate || ""}
              onChange={handleEndDateChange}
              style={{
                padding: "0rem",
                borderColor: "#4f4f4f",
                margin: "10px",
              }}
            />
            <Button onClick={clearSorting}>Clear</Button>
          </p>

          <br />
          {bookings?.length > 0 ? (
            bookings.filter(filterBookingsByDate).map((booking) => (
              <div
                key={booking._id}
                style={{
                  borderRadius: "8px",
                  boxShadow:'rgb(219, 213, 213) 4px 4px 6px 3px',
                  width: "80%",
                  margin: "auto",
                  marginBottom: "50px",
                }}
              >
                <div>
                  booking_id
                  <br />
                  <p style={{ color: "rgb(4 71 95)" }}>
                    <strong># {booking._id}</strong>
                  </p>
                  <div className="custBookingsParent">
                    <div className="custBookingsChild">
                      Appointment Date: {booking.appointmentdate} <br />
                      Appointment Time: {booking.time} <br />
                      Services Booked: {booking.services.join(", ")} <br />
                      Total Amount: ₹{booking.amount} <br />
                      Payment Status: {booking.paymentStatus} <br />
                      Service Status: {booking.serviceStatus} <br />
                      {booking.paymentStatus === "Completed" &&
                        booking.serviceStatus === "Service Completed" && (
                          <IconButton
                            onClick={() => handleShowInvoice(booking)}
                            variant="contained"
                            color="primary" // Pass the whole booking object
                            style={{ float: "right" }}
                          >
                            <PrintIcon /> Download Invoice
                          </IconButton>
                        )}
                      <Tooltip
                        title="Cancel Booking"
                        PopperProps={{
                          sx: {
                            typography: "body1",
                            "& .MuiTooltip-tooltip": { fontSize: "1rem" },
                          },
                        }}
                      >
                        <IconButton
                          key={booking._id}
                          booking={booking}
                          onClick={() => handleOpenDialog(booking)}
                          style={{ float: "right" }}
                          disabled={booking.serviceStatus !== "Service Pending"}
                        >
                          <EventBusyIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className="custBookingsChild">
                      Add a Review for us <RateReviewIcon />
                      <br />
                      <Input
                        value={reviewText[booking._id] || ""}
                        onChange={(e) =>
                          handleReviewChange(booking._id, e.target.value)
                        }
                        disabled={
                          !isReviewEditing[booking._id] &&
                          booking.serviceStatus !== "Service Completed"
                        }
                      />
                      <div>
                        <fieldset className="rate">
                          {Array.from({ length: 10 }, (_, index) => {
                            // 10 inputs for 5 full stars (including halves)
                            const ratingValue = 10 - index; // 10, 9, 8, ..., 1
                            const isHalfStar = ratingValue % 2 !== 0; // Odd numbers are half stars
                            const starCount =
                              ratingValue % 2 === 0
                                ? ratingValue / 2
                                : (ratingValue / 2).toFixed(1); // Calculates full and half star counts
                            return (
                              <React.Fragment key={ratingValue}>
                                <input
                                  type="radio"
                                  id={`rating${ratingValue}-${booking._id}`}
                                  name={`rating-${booking._id}`}
                                  value={ratingValue.toString()}
                                  onChange={(e) =>
                                    handleRatingChange(
                                      booking._id,
                                      e.target.value
                                    )
                                  }
                                  checked={
                                    rating[booking._id] ===
                                    ratingValue.toString()
                                  }
                                />
                                <label
                                  htmlFor={`rating${ratingValue}-${booking._id}`}
                                  title={`${starCount} stars`}
                                  className={isHalfStar ? "half" : ""}
                                ></label>
                              </React.Fragment>
                            );
                          })}
                        </fieldset>
                      </div>
                      {isReviewEditing[booking._id] ? (
                        <>
                          <IconButton
                            onClick={() => handleUpdateReview(booking._id)}
                            style={{ float: "right" }}
                          >
                            <Upload /> Update
                          </IconButton>
                          <IconButton
                            onClick={() => handleCancelEdit(booking._id)}
                            style={{ float: "right" }}
                          >
                            <Close /> Cancel
                          </IconButton>
                        </>
                      ) : (
                        <>
                          {reviewPostedMap[booking._id] ? (
                            <IconButton
                              onClick={() => handleEditReview(booking._id)}
                              style={{ float: "right" }}
                            >
                              <Edit /> Edit
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => handlePostReview(booking._id)}
                              disabled={
                                booking.serviceStatus !== "Service Completed"
                              }
                              style={{ float: "right" }}
                            >
                              <UploadFileIcon /> Submit
                            </IconButton>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>No History Found</p>
            </div>
          )}
        </div>
      </div>
      {/* {invoiceData && <InvoiceComponent data={invoiceData} isVisible={showInvoice} />} */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default CustBookings;
