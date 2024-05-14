import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import '../App.css'

const Admincustreviews = () => {
  const [reviewsAdmin, setReviewsAdmin] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    // Fetch reviews data from backend when component mounts
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reviewsadmin'); 
      setReviewsAdmin(response.data.reviewsadmin);
  
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDeleteConfirmation = (reviewId) => {
    // Set the review to delete and open the confirmation dialog
    setReviewToDelete(reviewId);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      // Make API call to delete the review
      await axios.delete(`http://localhost:8000/reviews/${reviewToDelete}`);
      // After successful deletion, fetch the updated reviews
      fetchReviews();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleCloseDialog = () => {
    // Close the confirmation dialog
    setOpenDialog(false);
  };

  return (
    <div className='adminCustReviews'>
      <Paper sx={{ width: "100%", overflow: "hidden" }} >
        <TableContainer sx={{ maxHeight: 440 }} >
          <Table stickyHeader aria-label="sticky table"  >
            <TableHead >
              <TableRow >
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Name</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem', 'color':' white !important','background': '#04475f !important' }}><strong>Review</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem', 'color':' white !important','background': '#04475f !important' }}><strong>Services Availed</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Review Date</strong></TableCell>
                <TableCell sx={{ fontSize: '1.3rem','color':' white !important','background': '#04475f !important' }}><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewsAdmin.map((review) => (
                <TableRow key={review._id}>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{review.cust_id.name}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{review.reviewText}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{review.booking_id?.services?.join(", ")}</TableCell>
                  <TableCell sx={{ fontSize: '1.3rem' }}>{new Date(review.reviewDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteConfirmation(review._id)}
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Admincustreviews;
