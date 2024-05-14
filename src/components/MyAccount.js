import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (token) {
      const perseUser = JSON.parse(token);
      setUserData(JSON.parse(token));
      axios
        .get(`http://localhost:8000/myaccount?email=${perseUser.email}`, {
          headers: {
            Authorization: `Bearer ${perseUser.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            // Token expired, show alert
            alert("Your session has expired. Please log in again.");
          } else {
            // Other error occurred
            setError(error.message);
          }
        });
    }
  }, []);

  // const fetchProfile=async()=>{

  // }

  const handleEdit = () => {
    setIsEditable(!isEditable); // Toggle edit mode
  };

  const handleUpdateProfile = () => {
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:8000/myaccount", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Upon successful update, show a toast notification
        toast.success("Profile updated successfully!");
        // Fetch the updated user data to reflect changes
        setUserData(response.data);
        // Exit edit mode
        setIsEditable(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Show error toast notification if update fails
        toast.error("Failed to update profile. Please try again later.");
      });
  };

  return (
    <div>
      <Header />
      <div className="myaccountParent">
        <h3>
          <p style={{ paddingLeft: "60px", color:'rgb(4 71 95)' }}>
            <strong>My Account</strong>
          </p>
        </h3>
        {userData && (
          <div className="myaccountContents">
            <div>
              <strong>Name:</strong>{" "}
              {isEditable ? (
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={userData.name}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              ) : (
                userData.name
              )}
            </div>

            <div>
              <strong>Email:</strong>{" "}
              {isEditable ? (
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={userData.email}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              ) : (
                userData.email
              )}
            </div>

            <div>
              <strong>Address:</strong>{" "}
              {isEditable ? (
                <input
                  className="input-field"
                  type="text"
                  name="address"
                  value={userData.address}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              ) : (
                userData.address
              )}
            </div>

            <div>
              <strong>Age:</strong>{" "}
              {isEditable ? (
                <input
                  className="input-field"
                  type="number"
                  name="age"
                  value={userData.age}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setUserData({ ...userData, age: e.target.value })
                  }
                />
              ) : (
                userData.age
              )}
            </div>

            <div>
              <strong>Phone:</strong>{" "}
              {isEditable ? (
                <input
                  className="input-field"
                  type="number"
                  name="phone"
                  value={userData.phone}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              ) : (
                userData.phone
              )}
            </div>
            <br></br>

            {isEditable && (
              <button className="update-button" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            )}

            <br></br>

            <button className="edit-button" onClick={handleEdit}>
              {isEditable ? "Cancel Edit" : "Edit "}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
