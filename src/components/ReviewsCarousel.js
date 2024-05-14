import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewLogo from "../images/reviewLogo.png";
import "../App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ReviewsCarousel() {
  const [reviewsData, setReviewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatic carousel movement
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % reviewsData.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [currentIndex, reviewsData.length]);

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + reviewsData.length) % reviewsData.length;
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % reviewsData.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    // Fetch reviews data from backend
    const fetchReviewsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/reviewscarousel"
        );
        setReviewsData(response.data.reviewscarousel); // Corrected to match the backend response
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviewsData();
  }, []);

  return (
    <div style={{ backgroundColor: "#d3d3d347", position: "relative", paddingBottom:'20px' }}>
    <p style={{ textAlign: "center", fontFamily: "cursive",color:'rgb(4, 71, 95)'}}>InstAura Customer Reviews</p>
    <div className="imageContainer" style={{ position: "relative" }}>
      <div
        className="carousel"
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * 30}%)`, // Adjust according to your carousel item width
          position: "relative",
          width: `${reviewsData.length * 30}vw`, // Adjust based on the number of reviews
          animation: "scroll 5s linear infinite", // Infinite loop animation
        }}
      >
        {reviewsData && reviewsData.length > 0 ? (
          reviewsData.map((review, reviewIndex) => (
            <div
              key={reviewIndex}
              style={{
                borderRadius: "8px",
                boxShadow: "rgb(219, 213, 213)  4px 4px 6px 3px",
                backgroundColor: "white",
                flex: "0 0 auto",
                marginRight: "1rem",
                width: "30%",
              }}
            >
              <figure>
                <div style={{ textAlign: "-webkit-center" }}>
                  <img
                    src={ReviewLogo}
                    alt="Review Logo"
                    style={{ height: "5rem", width: "5rem" }}
                  />
                  {review.cust_id.name}
                  <br />
                  {review.cust_id.address}
                  <br />
                  <div>
                    <fieldset className="rate">
                      {Array.from({ length: 10 }, (_, index) => {
                        const ratingValue = 10 - index;
                        const isHalfStar = ratingValue % 2 !== 0;
                        const starCount =
                          ratingValue % 2 === 0
                            ? ratingValue / 2
                            : (ratingValue / 2).toFixed(1); // Calculates full and half star counts
                        return (
                          <React.Fragment key={ratingValue}>
                            <input
                              type="radio"
                              id={`rating-${ratingValue}-${reviewIndex}`}
                              name={`rating-${reviewIndex}`}
                              value={ratingValue.toString()}
                              readOnly
                              checked={review.rating === ratingValue} // Compare review rating with ratingValue
                            />
                            <label
                              htmlFor={`rating-${ratingValue}-${reviewIndex}`}
                              title={`${starCount} stars`}
                              className={isHalfStar ? "half" : ""}
                            ></label>
                          </React.Fragment>
                        );
                      })}
                    </fieldset>
                  </div>
                </div>
                <br />
                <div style={{ fontSize: "1.5rem", paddingLeft: "10px" }}>
                  Review Date:{" "}
                  {new Date(review.reviewDate).toLocaleDateString()}
                  <br />
                  <strong>
                    {" "}
                    Services done: </strong> {review.booking_id?.services?.join(
                      ", "
                    )}{" "} 
                  
                  <br />
                  <strong>Customer Feedback:</strong> {review.reviewText}
                </div>
              </figure>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIosIcon />
      </button>
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  </div>
  );
}

export default ReviewsCarousel;
