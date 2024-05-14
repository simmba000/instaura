import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';
import ReviewsCarousel from './ReviewsCarousel';

function HomepageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/gallery')
        .then(response => setImages(response.data.images))
        .catch(error => console.error('Error fetching images:', error));
    }, []);

  return (
    <div>
      <div className='HomepageGallery'>
        <p style={{fontFamily: "cursive",color:'rgb(4, 71, 95)'}}>InstAura Gallery</p>
        <div className='HomePageGalleryGrid'>
      {images.map(image => (
             <div key={image._id} className='HomepageGalleryPhoto' >
        <img style={{height:"280px",width:"100%", boxShadow:"4px 5px 10px 3px #767373",borderRadius:"5px"}} 
        src={`http://localhost:8000/uploads/${image.path}`} alt={image.title}/>
            </div>
      ))}
        </div>
      </div> <br/> <br/>
      <ReviewsCarousel/>
    </div>
  )
}

export default HomepageGallery
