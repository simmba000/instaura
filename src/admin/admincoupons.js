import React from "react";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TableBody, TableContainer, Paper,  Table,TableCell,TableHead,TableRow, Button} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from "react";

const Admincoupons = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:8000/couponsadmin");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Failed to fetch coupons");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponCode,
          couponDiscount,
          activeDate,
          expiryDate,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Coupon added successfully:", data);
        toast.success("Coupon added successfully");
        fetchCoupons();
        setCouponCode("");
        setCouponDiscount("");
        setActiveDate("");
        setExpiryDate("");
        // Optionally, you can show a success message or redirect the user
      } else {
        console.error("Failed to add coupon:", response.statusText);
        toast.error("Failed to add Coupon");
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      // Handle error appropriately
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/coupons/${id}`);
      if (response.status === 200) {
        toast.success("Coupon deleted successfully");
        fetchCoupons();
      } else {
        console.error("Failed to delete coupon:", response.statusText);
        toast.error("Failed to delete Coupon");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete Coupon");
    }
  };

  return (
    <div>
      <div className="adminServicemain">
        <strong style={{ fontSize: "1.75rem",alignSelf: 'center' }}>Add Festive Coupons</strong>
        <div className="adminServicecss">
          <form onSubmit={handleSubmit}>
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput
                  id="form3Example1"
                  label="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="addserviceAdmin"
                />
              </MDBCol>

              <MDBCol>
                <MDBInput
                  id="form3Example1"
                  label="Coupon Discount (%)"
                  value={couponDiscount}
                  onChange={(e) => setCouponDiscount(e.target.value)}
                  className="addserviceAdmin"
                />
              </MDBCol>

              <MDBCol>
                <MDBInput
                  id="form3Example1"
                  type="date"
                  label="Active From"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="addserviceAdmin"
                />
              </MDBCol>

              <MDBCol>
                <MDBInput
                  id="form3Example1"
                  type="date"
                  label="Expire On"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="addserviceAdmin"
                />
              </MDBCol>
            </MDBRow>

            <MDBBtn
              type="submit"
              className="mb-4"
              block
              style={{ backgroundColor: "rgb(4 71 95)",fontSize: "1.3em" }}
            >
              Add Coupon
            </MDBBtn>
          </form>
        </div>
        <strong style={{ fontSize: "1.75rem", marginTop:'1.3rem',alignSelf: 'center' }}>All Coupons</strong>
        <div style={{boxShadow:' 0px 2px 5px 2px lightgrey', marginTop:'2rem', borderRadius:'5px'}}>
        <Paper sx={{ width: "100%", overflow: "hidden" }} >
        <TableContainer sx={{ maxHeight: 440 }} >
          <Table stickyHeader aria-label="sticky table"  >
            <TableHead >
              <TableRow>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Coupon Code</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Coupon Discount(in %)</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Active Date</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Expiry Date</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {coupons.map(coupon => (
                <TableRow key={coupon._id} >
                  <TableCell sx={{ fontSize: '1.3rem' }}>{coupon.couponCode}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{coupon.couponDiscount}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{coupon.activeDate}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{coupon.expiryDate}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(coupon._id)}
                      variant="contained"
                      color="primary"
                      sx={{backgroundColor:'rgb(4, 71, 95)'}}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </div>
      </div>
    </div>
  );
};

export default Admincoupons;
