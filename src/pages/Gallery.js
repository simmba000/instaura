// src/components/Gallery.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/gallery")
      .then((response) => setImages(response.data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <Header />

      <div className="GalleryContainer">
        <p
          style={{
            color: "rgb(4, 71, 95)",
            fontWeight: 600,
            paddingLeft: "60px",
            paddingTop: "5px",
          }}
        >
          Image Gallery
        </p>
        <div className="GalleryGrid">
          {images.map((image) => (
            <div key={image._id} className="GalleryPhoto">
              <img
                style={{
                  height: "280px",
                  width: "100%",
                  boxShadow: "4px 4px 6px 3px rgb(185 168 168)",
                  borderRadius: "5px",
                }}
                src={`http://localhost:8000/uploads/${image.path}`}
                alt={image.title}
              />

              {/* <p>{image.title}</p> */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
