import { CircularProgress } from "@mui/material";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const Adminpromotionmail = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [subscribedUsersCount, setSubscribedUsersCount] = useState(0);

  useEffect(() => {
   
    const fetchSubscribedUsersCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/subscribedUsersCount");
        setSubscribedUsersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching subscribed users count:", error);
      }
    };

     // const intervalId = setInterval(fetchSubscribedUsersCount, 5000); // Fetch count every 5 seconds

    // return () => clearInterval(intervalId);
    fetchSubscribedUsersCount();
    
  }, []);

  const handleSendMessage = async () => {
    try {
        setIsSendingMail(true);
      await axios.post("http://localhost:8000/sendPromotionalEmails", {
        subject: emailSubject,
        htmlContent: editorHtml,
      });
      toast.success("Mail Sent Successfully !!");
      setEmailSubject("");
      setEditorHtml("");
    } catch (error) {
      console.error("Error sending promotional emails:", error);
      alert("Error sending promotional emails");
    }
    finally{
        setIsSendingMail(false);
    }
  };
  return (
    <div style={{ margin: "auto", marginTop: "2rem", textAlign: "center" }}>
      <div className="adminPromotionmain{">
        <strong style={{ fontSize: "1.75rem", textAlign: "center" }}>
          Send Promotional Mails
        </strong>
        <div className="adminPromotioncss ">
          <div className="adminPromoMain">
            <MDBInput
              wrapperClass="mb-4"
              label="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              style={{ fontSize: "1.3rem" }}
            />
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={setEditorHtml}
              style={{
                height: "200px",
                width: "400px",
                maxWidth: "400px",
                overflowY: "auto",
                overflowWrap: "break-word",
              }}
            />
            <br />
            <div style={{textAlign:'center'}}>
            {isSendingMail ?  <CircularProgress size={20} style={{color:'rgb(4 71 95)'}}  /> :  
            <MDBBtn
              onClick={handleSendMessage}
              className="mb-4"
              block
              style={{ backgroundColor: "rgb(4 71 95)", fontSize: "1em" }}
            >
              Send Message
            </MDBBtn>
                }
                </div>
                Subscribed Customers :  {subscribedUsersCount}
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default Adminpromotionmail;
