import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";

import InvoiceComponent from "../components/InvoiceComponent";
import { Tooltip } from "@mui/material";

const Adminbookings = () => {
  const [bookings, setBookings] = useState([]);
  const [nameMapping, setNameMapping] = useState({});
  const [addressMapping, setAddressMapping] = useState({});
  const [phoneMapping, setPhoneMapping] = useState({});
  const [emailMapping, setEmailMapping] = useState({});
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState({});
  const [selectedServiceStatus, setSelectedServiceStatus] = useState({});
  const [invoiceData, setInvoiceData] = useState(null);
  const [confirmedPaymentStatus, setConfirmedPaymentStatus] = useState({});
  const [confirmedServiceStatus, setConfirmedServiceStatus] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.allBookings);
      const paymentStatus = {};
      const serviceStatus = {};
      const confirmedPayment = {};
      const confirmedService = {};
      response.data.allBookings.forEach((booking) => {
        paymentStatus[booking._id] = booking.paymentStatus;
        serviceStatus[booking._id] = booking.serviceStatus;
        confirmedPayment[booking._id] = booking.paymentStatus;
        confirmedService[booking._id] = booking.serviceStatus;
      });
      setSelectedPaymentStatus(paymentStatus);
      setSelectedServiceStatus(serviceStatus);
      setConfirmedPaymentStatus(confirmedPayment);
      setConfirmedServiceStatus(confirmedService);
    };

    fetchNameMapping();
    fetchAddressMapping();
    fetchPhoneMapping();
    fetchEmailMapping();
    fetchBookings();
  }, []);

  const fetchNameMapping = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mapping = {};
    response.data.forEach((user) => {
      mapping[user._id] = user.name;
    });
    setNameMapping(mapping);
  };

  const fetchAddressMapping = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mapping = {};
    response.data.forEach((user) => {
      mapping[user._id] = user.address;
    });
    setAddressMapping(mapping);
  };

  const fetchPhoneMapping = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mapping = {};
    response.data.forEach((user) => {
      mapping[user._id] = user.phone;
    });
    setPhoneMapping(mapping);
  };

  const fetchEmailMapping = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mapping = {};
    response.data.forEach((user) => {
      mapping[user._id] = user.email;
    });
    setEmailMapping(mapping);
  };

  const handleUpdateBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const paymentStatus = selectedPaymentStatus[bookingId];
      const serviceStatus = selectedServiceStatus[bookingId];
      const gggg = await axios.put(
        `http://localhost:8000/bookings/${bookingId}/update`,
        {
          paymentStatus,
          serviceStatus,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(gggg);
      // Update confirmed status only on successful server response
      setConfirmedPaymentStatus((prev) => ({
        ...prev,
        [bookingId]: paymentStatus,
      }));
      setConfirmedServiceStatus((prev) => ({
        ...prev,
        [bookingId]: serviceStatus,
      }));

      toast.success("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Error updating booking");
    }
  };

  const handleShowInvoice = (booking) => {
    const paymentStatus = selectedPaymentStatus[booking._id];
    const serviceStatus = selectedServiceStatus[booking._id];
    console.log(booking);
    const data = {
      name: nameMapping[booking.cust_id],
      address: addressMapping[booking.cust_id],
      services: booking.services.join(", "),
      appointmentdate: booking.appointmentdate,
      amount: booking.amount,
      paymentStatus: paymentStatus,
      serviceStatus: serviceStatus,
    };

    setInvoiceData(data); // Set the invoice data for use in the print function
    printInvoice();
  };

  const printInvoice = () => {
    if (!invoiceData) return; // Ensure data is available

    const element = document.createElement("div");
    const root = createRoot(element); // Use createRoot for React 18
    root.render(<InvoiceComponent data={invoiceData} isVisible={true} />);

    setTimeout(() => {
      // Wait for the component to render
      const printWindow = window.open("", "PRINT", "height=600,width=800");
      printWindow.document.write("<html><head><title>Invoice</title>");
      printWindow.document.write("</head><body>");
      printWindow.document.write(element.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close(); // Necessary for IE >= 10
      printWindow.focus(); // Necessary for IE >= 10

      printWindow.print();
      printWindow.close();
    }, 500); // Adjust timing as necessary
  };

  // useEffect(() => {
  //   if (invoiceData) {
  //     printInvoice();
  //   }
  // }, [invoiceData]);
  // Calls printInvoice whenever invoiceData changes

  return (
    <div style={{ marginTop: "3em" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Name</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Appointment Date</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Services Booked</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Total Price</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Payment Status</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Service Status</strong>
                </TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => {
                const isConfirmed =
                  confirmedPaymentStatus[booking._id] === "Completed" &&
                  confirmedServiceStatus[booking._id] === "Service Completed";

                return (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <Tooltip
                        title={
                          <div style={{ fontSize: "1.2rem" }}>
                            <div>Name: {nameMapping[booking.cust_id]}</div>
                            <div>
                              Address: {addressMapping[booking.cust_id]}
                            </div>
                            <div>
                              Phone No.: {phoneMapping[booking.cust_id]}
                            </div>
                            <div>Email: {emailMapping[booking.cust_id]}</div>
                          </div>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                        arrow
                        placement="right"
                      >
                        <span style={{ fontSize: "1.2rem", cursor: "pointer" }}>
                          {nameMapping[booking.cust_id]}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                      {booking.gender}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                      {booking.appointmentdate}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                      {booking.services.join(", ")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                      ₹{booking.amount}
                    </TableCell>
                    <TableCell>
                      {/* {isCompleted ? selectedPaymentStatus[booking._id] : ( */}
                      <Select
                        value={selectedPaymentStatus[booking._id]}
                        onChange={(e) =>
                          setSelectedPaymentStatus({
                            ...selectedPaymentStatus,
                            [booking._id]: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Not Completed">Not Completed</MenuItem>
                      </Select>
                      {/* )} */}
                    </TableCell>
                    <TableCell>
                      {/* {isCompleted ? selectedServiceStatus[booking._id] : ( */}
                      <Select
                        value={selectedServiceStatus[booking._id]}
                        onChange={(e) =>
                          setSelectedServiceStatus({
                            ...selectedServiceStatus,
                            [booking._id]: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Service Pending">
                          Service Pending
                        </MenuItem>
                        <MenuItem value="Service Completed">
                          Service Completed
                        </MenuItem>
                        <MenuItem value="Service Cancelled">
                          Service Cancelled
                        </MenuItem>
                      </Select>
                      {/* )} */}
                    </TableCell>
                    <TableCell>
                      {isConfirmed ? (
                        <Button
                          onClick={() => handleShowInvoice(booking)}
                          variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)',fontSize: "1.3em"}}
                        >
                          Download Invoice
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleUpdateBooking(booking._id)}
                          variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)',fontSize: "1.3em"}}
                        >
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {invoiceData && <InvoiceComponent data={invoiceData} />}
    </div>
  );
};

export default Adminbookings;
