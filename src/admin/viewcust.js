import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Viewcust = () => {
  const [users, setUsers] = useState([]);
  const [selectedAction, setSelectedAction] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/getUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/deleteUser/${id}`)
      .then(() => {
        toast.success("User Deleted Successfully");
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleBlockUser = (id, isActive) => {
    axios
      .put(`http://localhost:8000/blockUser/${id}`, { isActive: !isActive })
      .then(() => {
        toast.success(`User ${isActive ? "Blocked" : "Reactivated"} Successfully`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isActive: !isActive } : user
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const handleAction = (id) => {
    const { action } = selectedAction[id] || {};

    if (action === "Delete User") {
      handleDeleteUser(id);
    } else if (action === "Block Account" || action === "Reactivate Account") {
      handleBlockUser(id, action === "Block Account");
    }
  };

  const handleSelectedActionChange = (id, value) => {
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [id]: { action: value }
    }));
  };

  return (
    <div className="adminCustReviews">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Name</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Email</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Role</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Phone</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Age</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Address</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Status</strong></TableCell>
                <TableCell sx={{ fontSize: "1.3rem",'color':' white !important','background': '#04475f !important' }}><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.name}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.email}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.role}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.phone}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.age}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>{user.address}</TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}><strong>{user.isActive ? "Active" : "Blocked"}</strong></TableCell>
                  <TableCell sx={{ fontSize: "1.3rem" }}>
                    <select
                      className="form-select mb-3"
                      value={(selectedAction[user._id] && selectedAction[user._id].action) || ""}
                      onChange={(e) => handleSelectedActionChange(user._id, e.target.value)}>
                      <option value="" disabled>Select</option>
                      <option value="Delete User">Delete User</option>
                      {user.isActive ? (
                        <option value="Block Account">Block Account</option>
                      ) : (
                        <option value="Reactivate Account">Reactivate Account</option>
                      )}
                    </select>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{backgroundColor:'rgb(4, 71, 95)', margin:'0em'}}
                      onClick={() => handleAction(user._id)}>
                      
                      Done
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Viewcust;
