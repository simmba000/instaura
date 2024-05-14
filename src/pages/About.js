import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstaAuraInterior1 from '../images/InstAura-Original-Photos/output_image.png'
import PhoneIcon from '@mui/icons-material/Phone';

const About = () => {
  return (
    <div>
      <Header />
     <div style={{display:'flex'}}>
      <div style={{width:'50%',padding:'20px', marginTop:'3rem',}}>
      <img style={{boxShadow:'rgb(219, 213, 213) 4px 4px 6px 3px', borderRadius:'5px'}} src={InstaAuraInterior1} alt='Interior' className=''/>
      </div>
      <div style={{width:'50%',padding:'20px'}}>
       <h4 style={{fontSize:'20px', 
                  // textDecoration:'underline',
                  textAlign:'left',marginLeft:"2rem",color:'rgb(4 71 95)'
                  }}>
       <strong>Instaura Unisex Salon</strong>
       </h4> 
       {/* <div style={{textAlign:'end',
       fontSize:'18px'
       }}>Beltola, Ghy</div> */}
      <p style={{color:'rgb(4 71 95)', textAlign:'left', fontSize:'16px', padding:'20px'}}>
        Instaura Unisex Hair and Beauty Spa Salon is a Beauty salon located at
        1st Floor, Lakhimandir Complex, Maa Manasha Market, Beltola Tiniali,
        Guwahati, Assam 781028, IN. The establishment is listed under beauty
        salon, spa, hairdresser category. It has received positive reviews with an
        average rating of 4.4 stars till date on Google.<br/><br/>
        <p style={{color:'rgb(4 71 95)', textAlign:'left', fontSize:'16px'}}>
         We proudly welcome all our customers to experience the aura and expertise at Instaura. 
         With our hands-on experts we are sure you will visit again. </p>
         <p p style={{color:'rgb(4 71 95)', fontSize:'16px',textAlign:'right'}}> With love from, <br/>
      Instaura Unisex Salon, <br/>
      Beltola, Ghy<br/>
      <PhoneIcon sx={{ fontSize: '2rem' }}/> +91 60039 81831</p>
      </p>
      
      </div>
     </div>
     

      <Footer />
    </div>
  );
};

export default About;
