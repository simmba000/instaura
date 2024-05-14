// LoginMessageModal.js

import React from 'react';
import './LoginMessageModal.css';

const LoginMessageModal = ({ onClose }) => {
  return (
    <div className="login-message-modal">
      <p>Please login to book your appointment</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default LoginMessageModal;
