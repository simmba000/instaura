import React, { useState } from 'react';

const PaymentMethod = ({ onPaymentTypeChange }) => {
  const [paymentType, setPaymentType] = useState('pay-now');

  const handlePaymentChange = (event) => {
    const selectedPaymentType = event.target.value;
    setPaymentType(selectedPaymentType);
    onPaymentTypeChange(selectedPaymentType);
  };

  return (
    <div className="payment-method-card">
      <h2 style={{fontSize:'18px'}}>Choose Payment Method</h2>
      <div className="payment-options" style={{fontSize:'14px'}}>
        <label>
          <input
            type="radio"
            name="payment"
            value="pay-now"
            checked={paymentType === 'pay-now'}
            onChange={handlePaymentChange}
          />
          Pay Now
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="pay-later"
            checked={paymentType === 'pay-later'}
            onChange={handlePaymentChange}
          />
          Pay after Service
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
