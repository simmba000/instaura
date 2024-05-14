import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {IconButton} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Adminaddcarousel = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // State for managing dialog visibility
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/carouselgallery")
        .then((response) => setUploadedPhotos(response.data.images))
        .catch((error) => console.error(error));
    }, []);
  
    const handleDelete = (id) => {
      setDeleteConfirmationId(id); // Set the id to delete
      setOpenDialog(true); // Open the confirmation dialog
    };
    
    // Inside the dialog, handle the deletion
    const handleConfirmDelete = () => {
      axios
        .delete(`http://localhost:8000/carouselgallery/${deleteConfirmationId}`)
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          setUploadedPhotos((prevPhotos) =>
            prevPhotos.filter((photo) => photo._id !== deleteConfirmationId)
          );
          setOpenDialog(false); // Close the dialog after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting photo:", error);
          toast.error("Failed to delete photo");
          setOpenDialog(false); // Close the dialog on error
        });
    };
    
    // Close the dialog when the user cancels
    const handleCancelDelete = () => {
      setOpenDialog(false);
    };
    
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
  
      try {
        const response = await axios.post(
          "http://localhost:8000/carousel",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log(response.data);
        // Optionally, update state or perform any other actions after successful upload
        setUploadedPhotos([...uploadedPhotos, response.data.image]); // Update the state with the newly uploaded photo
        setTitle('');
        setFile(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  
    return (
      <div style={{marginLeft:'50px',marginTop:'1.4rem'}}>
        <div className="adminUploadmain">
        <strong style={{ fontSize: "1.75rem" }}>Upload Images To Carousel</strong>
  
          <div className="adminUploadcss">
            {/* <label htmlFor="title" className='adminLabelText'>Title:</label> */}
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="admininput"
              placeholder="Title"
            />
          
          <br></br>
          
            {/* <label htmlFor="image" className='adminLabelText'>Image:</label> */}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="admininput"
            /><br/>
            <Button
            style={{
              backgroundColor: "rgb(4 71 95)",
              color: "white",
              padding: "6px",
              borderRadius: "5px",
              fontSize: "1.3em",
            }}
            onClick={handleUpload}
          >
            Upload  <FileUploadIcon/>
          </Button>
          </div>
          <br></br>
          
        </div>
        <div style={{ paddingTop: "15px", textAlign: "center" }}>
        <strong style={{ fontSize: "1.75rem" }}>Uploaded Photos</strong>
          <div className="uploaded-photos">
            {uploadedPhotos.map((photo) => (
              <div key={photo._id} className="photo-item">
                <img
                  src={`http://localhost:8000/carousels/${photo.path}`}
                  alt={photo.title}
                  style={{height:'97px'}}
                />
                <br></br>
                <IconButton
                  style={{
                    backgroundColor: "rgb(4 71 95)",
                    color: "white",
                    padding: "auto",
                    borderRadius: "6px",
                    fontSize: "1em",
                  }}
                  onClick={() => handleDelete(photo._id)} // Call handleDelete
                >
                  <DeleteForeverIcon/> 
                </IconButton>
              </div>
            ))}
          </div>
        </div>
               {/* Delete confirmation dialog */}
               <Dialog
    open={openDialog}
    onClose={handleCancelDelete}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this image?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete} color="primary">
        No
      </Button>
      <Button onClick={handleConfirmDelete} color="primary" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
  
      </div>
    );
  };

export default Adminaddcarousel