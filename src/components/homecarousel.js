import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function HomeCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/carouselgallery");
      const tempImages = response.data.images.map((item) => ({
        path: `http://localhost:8000/carousels/${item.path}`,
        alt: `Slide ${item.id}`
      }));
      setImages(tempImages);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image.path} alt={image.alt} 
               style={{ maxWidth: "100%", maxHeight: "450px", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
      <button className="control-btn prev-btn" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </button>
      <button className="control-btn next-btn" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </button>
      <div className="dots-container">
        {images.map((image, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HomeCarousel;
