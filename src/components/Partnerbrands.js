import React from "react";
import styled from "styled-components";
import Loreal from "../images/brand logo-1.png";
import Kerastase from "../images/brand logo-2.png";
import WetBrush from "../images/brand logo-5.png";
import BrasilCacau from "../images/brand logo-4.png";
import Olaplex from "../images/brand logo-3.png";
import CouponBanner from '../images/coupon_banner.png'
import "../App.css"


const Partnerbrands = () => {
  return (
    <Wrapper>
    <div className="brands-heading"> <strong> OUR PARTNER BRANDS </strong> </div>
      <div className="containerforbrands">      
        <div className="grid grid-three-column">
        
          <div className="services-2">
            <div className="services-colum-2">
              <div>
              <img src={Loreal} alt='loreal' className=''/>
              </div>
            </div>
            <div className="services-colum-2">
              <div>
              <img src={Kerastase} alt='kerastase' className=''/>
              </div>
            </div>
          </div>

          <div className="services-1">
            <div>
            <img src={WetBrush} alt='wetbrush' className=''/>
            </div>
          </div>

          <div className="services-2">
            <div className="services-colum-2">
              <div>
              <img src={BrasilCacau} alt='brasilcacau' className=''/>
              </div>
            </div>
            <div className="services-colum-2">
              <div>
              <img src={Olaplex} alt='olaplex' className=''/>
              </div>
            </div>
          </div>
        </div><br/>
       <div style={{backgroundColor:'rgba(211, 211, 211, 0.48)', marginTop:'2rem'}}>
       <div style={{padding:'3rem',}}>
        <img src={CouponBanner} alt='banner' className=''/>
        </div>
       </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 2rem ;

  .grid {
    gap: 12rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: white;
    text-align: center;
    border-radius: 2rem;
    border: white solid;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: white;
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
  }

  .icon {
    /* font-size: rem; */
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 50%;
    background-color: #fff;
    color: #5138ee;
  }

  .brands-heading{
    text-align: center;
    margin-bottom: 10px;
    font-size: 21px;
  }
`;
export default Partnerbrands;