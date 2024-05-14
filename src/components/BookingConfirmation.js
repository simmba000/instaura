import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { useLocation } from 'react-router-dom';


const BookingConfirmation = () => {
  const [userData, setUserData] = useState({
    address: '',
  });
  const [countdown, setCountdown] = useState(10); // 10 seconds countdown for example
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user');
      const parseUser = JSON.parse(token);
      setUserData(JSON.parse(token));
      const response = await fetch(`http://localhost:8000/myaccount?email=${parseUser.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer  ${parseUser.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          ...userData,
          address: data.address,
        });
      } else {
        console.error('Failed to fetch user data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      navigate('/'); // Use navigate to redirect
    }
  }, [countdown, navigate]);

  const location = useLocation();
const { appointmentDate, appointmentTime, servicesBooked, totalPrice, paymentStatus, serviceStatus } = location.state || {};


  return (
    <div>
      <Header />
      <div className='confirmBooking'>
        Your booking is Successful with us!!<br />
        You are one step closer to experience<br />
        the best Salon Service with Instaura
      </div>
      <div className='bookingCard'>
  You will come from {userData.address} !!<br />
  Appointment Date : {appointmentDate}<br />
  Appointment Time : {appointmentTime}<br />
  Services Booked : {servicesBooked}<br />
  Total Price : ₹ {totalPrice}<br />
  Payment Status : {paymentStatus}<br />
  Service Status : {serviceStatus}
</div>

      Redirecting you to the home page in {countdown} Seconds...
    <Footer isHide={true} />
    </div>
  );
};

export default BookingConfirmation;
