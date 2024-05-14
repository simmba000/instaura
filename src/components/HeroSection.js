import React from 'react'
import Photo1 from "../images/Photo_1.png"
import Photo2 from "../images/Photo_2.png"
import Photo3 from "../images/Photo_3.png"
import Photo4 from "../images/Photo_4.png"
import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css"

const HeroSection = () => {
  return (
    <div className='imageContainer'>
    
      <figure className='position-relative herogrid'>
        <img src={Photo1} alt='gents' className='img-fluid'/>
        <div className='hero-text'>
         <strong> Gent's Haircut Styles </strong>
         </div>
         <div className='discount-element'>
          <strong>  20% Off   </strong>
        </div>
      </figure> 

      <figure className='position-relative herogrid'>
        <img src={Photo2} alt='gents' className='img-fluid'/>
        <div className='hero-text'>
        <strong>Ladies Haircut Styles</strong>
          </div>
          <div className='discount-element'>
          <strong>  30% Off   </strong>
        </div>
      </figure>

      <figure className='position-relative herogrid'>
        <img src={Photo4} alt='gents' className='img-fluid'/>
        <div className='hero-text'>
        <strong> Kids Haircut Styles </strong>
          </div>
          <div className='discount-element'>
          <strong>  25% Off   </strong>
        </div>
      </figure>

      <figure className='position-relative herogrid'>
        <img src={Photo3} alt='gents' className='img-fluid'/>
        <div className='hero-text'>
        <strong> Spa Services </strong>
          </div>
          <div className='discount-element'>
          <strong>  30% Off   </strong>
        </div>
      </figure>
     </div>



  )
}


export default HeroSection