import React, { useState } from "react";
import "../App.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";





const Adminsettings = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state for resend OTP button
  const [isResendDisabled, setIsResendDisabled] = useState(false); // State to disable resend button
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const sendOTP = async () => {
    try {
      setIsSendingOTP(true);
      const response = await axios.post("http://localhost:8000/sendOTP", {
        email,
      });
      if (response.data.status === "success") {
        setMessage("OTP sent successfully");
        setTimer(60); // Set timer to 60 seconds
        setIsResendDisabled(true); // Disable resend button
        setOtpSent(true); // Mark OTP as sent
      } else {
        setMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP");
    }
    finally {
      setIsSendingOTP(false); // OTP sending completed, hide spinner
    }
  };

  const verifyOTP = async () => {
    try {
      setIsVerifyingOTP(true);
      const response = await axios.post("http://localhost:8000/verifyOTP", {
        email,
        otp,
      });
      if (response.data.status === "success") {
        setMessage("OTP verified successfully.");
        setIsOTPVerified(true);
        setOtpSent(false); // Reset OTP sent state
      } else {
        setMessage("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Failed to verify OTP");
    }
    finally{
      setIsVerifyingOTP(false);
    }
  };

  const changePassword = async () => {
    try {
      setIsChangingPassword(true);
      const response = await axios.post(
        "http://localhost:8000/changePassword",
        {
          email,
          newPassword,
        }
      );
      if (response.data.status === "success") {
        setMessage("Password changed successfully.");
        resetFields();
        toast.success("Password changed successfully.");
        setTimer(0);
        setIsResendDisabled(false);
      } else {
        setMessage("Failed to change password");
        toast.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Failed to change password");
    }
    finally{
      setIsChangingPassword(false);
    }
  };

  const resetFields = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setMessage("");
    setIsOTPVerified(false);
  };

  return (
    <div>
      <div className="adminSettingsmain">
        <strong style={{ fontSize: "1.75rem" }}>Change Your Password</strong>

        <div className="adminSettingscss" style={{ paddingTop: "20px" }}>
          <div className="adminUploadcss">
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: "1.3rem" }}
            />
            {!otpSent && !isOTPVerified && (
              <div style={{textAlign:'center'}}>
               
                {isSendingOTP ?  <CircularProgress size={20} style={{color:'rgb(4 71 95)'}}  /> :  
                <Button
                  variant="contained"
                  onClick={sendOTP}
                  style={{
                    backgroundColor: "rgb(4 71 95)",
                    fontSize: "1em",
                    margin: "1px",
                    padding: "3px",
                    width:'100%'
                  }}
                >
                  Send OTP
                </Button> 
                }
              </div>
            )}
            {otpSent && !isOTPVerified && (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Enter OTP"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ fontSize: "1.3rem" }}
                />
                <div style={{textAlign:'center'}}>
                 {isVerifyingOTP ?  <CircularProgress size={20} style={{color:'rgb(4 71 95)'}}  /> :
                 <MDBBtn
                  onClick={verifyOTP}
                  className="mb-4"
                  block
                  style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
                >
                  Verify
                </MDBBtn>
                  }
                  </div>
                  <div style={{textAlign:'center'}}>
               
               {isSendingOTP ?  <CircularProgress size={20} style={{color:'rgb(4 71 95)'}}  /> :  
                <Button
                  variant="contained"
                  onClick={sendOTP}
                  disabled={isResendDisabled} // Disable button if resend is disabled
                  style={{  backgroundColor: "rgb(4 71 95)",
                      fontSize: "1em",
                      margin: "1px",
                      padding: "3px",
                      width:'100%', }}
                >
                  Resend OTP ({timer} Sec)
                </Button>
               }
               </div>
              </>
            )}
            {isOTPVerified && (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Enter new password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ fontSize: "1.3rem" }}
                />
                <div style={{textAlign:'center'}}>
                {isChangingPassword ? <CircularProgress size={20} style={{color:'rgb(4 71 95)'}}  /> :
                <MDBBtn
                  onClick={changePassword}
                  className="mb-4"
                  block
                  style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
                >
                  Change Password
                </MDBBtn>
                }
                </div>
              </>
            )}
            {message && <p>{message}</p>}
            <br />
            Note: Please change your password after every two weeks.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminsettings;
