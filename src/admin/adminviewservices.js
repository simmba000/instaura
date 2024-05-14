import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  TableBody,
  
  Table,
  TableCell,
  TableHead,
  TableRow,
  
} from "@mui/material";

function Adminviewservices() {
  const [services, setServices] = useState([]);
  const [tempServices, setTempServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ladies");
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [updatedServiceName, setUpdatedServiceName] = useState("");
  const [updatedServicePrice, setUpdatedServicePrice] = useState(0); // New state for storing updated price
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState("");
  const [originalServiceName, setOriginalServiceName] = useState("");
  const [originalServicePrice, setOriginalServicePrice] = useState(0); // New state for storing original price
  const [originalEstimatedTime, setOriginalEstimatedTime] = useState("");
  const [updatedEstimatedTime, setUpdatedEstimatedTime] = useState("");
  

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("http://localhost:8000/services")
      .then((response) => {
        setServices(response.data.services);
        setTempServices(response.data.services)
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  const handleUpdate = (id, originalName) => {
    setEditingServiceId(id);
    setOriginalServiceName(originalName);
    setUpdatedServiceName(originalName);
    setOriginalServicePrice(originalServicePrice); // Set original price
    setUpdatedServicePrice(originalServicePrice); // Set updated price
    setOriginalEstimatedTime(originalEstimatedTime);
    setUpdatedEstimatedTime(updatedEstimatedTime);
    
  };

  const handleSave = (id) => {
    if (!updatedServiceName || updatedServiceName.trim() === "") {
      if (updatedServiceName.trim() === "") {
        toast.error("Service name cannot be empty");
      }
      return;
    }

    axios
      .put(`http://localhost:8000/services/${id}`, { service: updatedServiceName, price: updatedServicePrice,
    estimatedTime: updatedEstimatedTime })
      .then((response) => {
        toast.success("Service updated successfully");
        setEditingServiceId(null);
        fetchServices();
        setUpdatedServiceName("");
        setUpdatedServicePrice(0);
        setUpdatedEstimatedTime("");
      })
      .catch((error) => {
        console.error("Error updating service:", error);
        toast.error("Failed to update service");
      });
  };

  const handleCancelEdit = () => {
    setUpdatedServiceName("");
    setUpdatedServicePrice(originalServicePrice);
    setUpdatedEstimatedTime("");
    setEditingServiceId(null);
    };


    const handleDeleteConfirmation = (id) => {
      setServiceToDeleteId(id);
      setOpenDialog(true);
    };


  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/services/${serviceToDeleteId}`)
      .then((response) => {
        console.log(response.data.message)
        toast.success(response.data.message);
        fetchServices();
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        // toast.error("Failed to delete service");
      });
      setOpenDialog(false)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleSearch=(value)=>{
    setSelectedCategory(value)

    const filterData = tempServices.filter((item)=>item.category === value);
    console.log(filterData)
    setServices(filterData);
  }

  return (
    <div>
      <div className="w-60">
        <div className="adminServicemain">
        <strong style={{ fontSize: "1.75rem",alignSelf: 'center' }}>View your Services</strong>
          <select
            className="form-select mb-3"
            onChange={(e) => handleSearch(e.target.value)}
            value={selectedCategory}
          >
            <option value="ladies">Ladies</option>
            <option value="gents">Gents</option>
            <option value="kids">Kids</option>
          </select>
          <Table className="adminCustReviews " stickyHeader aria-label="sticky table" style={{fontSize:"1.2rem"}}>
          <TableHead>
          <TableRow>
          <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Sub-Category</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Service Name</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Price (INR)</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Est. Time (in Minutes)</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {services.length > 0 ?

              services.map((service) => (
                service.category === selectedCategory && (
                  <TableRow key={service._id}>
                    <TableCell sx={{ fontSize: "1.3rem" }}>{service.subCategory}</TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                    {editingServiceId === service._id ? (
                        <TextField
                          value={updatedServiceName}
                          onChange={(e) => setUpdatedServiceName(e.target.value)}
                          // onBlur={handleCancelEdit}
                        />
                      ) : (
                        service.service
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                          {editingServiceId === service._id ? ( // Check if in editing mode
                            <TextField
                              value={updatedServicePrice}
                              onChange={(e) => setUpdatedServicePrice(e.target.value)}
                            />
                          ) : (
                            service.price // Display price
                          )}
                        </TableCell>

                        <TableCell sx={{ fontSize: "1.3rem" }}>
                          {editingServiceId === service._id ? ( // Check if in editing mode
                            <TextField
                              value={updatedEstimatedTime}
                              onChange={(e) => setUpdatedEstimatedTime(e.target.value)}
                            />
                          ) : (
                            service.estimatedTime // Display est. time
                          )}
                        </TableCell>
                    <TableCell sx={{ fontSize: "1.3rem" }}>
                    {editingServiceId === service._id ? (
                      <>
                        <Button
                        variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)', margin:'1em'}}
                         onClick={() => handleSave(service._id)} >
                          <CheckCircleIcon/>
                        </Button>
                        <Button
                        variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)', margin:'1em'}}
                         onClick={handleCancelEdit}>
                            <CancelIcon />
                          </Button>
                        </>
                      ) : (
                        <Button
                        variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)', margin:'1em'}}
                         onClick={() => handleUpdate(service._id, service.service)} >
                          <EditIcon />
                        </Button>
                      )}
                      <Button
                      variant="contained"
                          color="primary"
                          sx={{backgroundColor:'rgb(4, 71, 95)', margin:'1em'}}
                       onClick={() => handleDeleteConfirmation(service._id)}>
                        <DeleteForeverIcon/> 
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )) : "no data"
            
            }
             
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this service?
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
</Dialog>;
    </div>
  );
}

export default Adminviewservices;
