import React from "react";
import HeroSection from "../components/HeroSection";
import Partnerbrands from "../components/Partnerbrands";
import HomeCarousel from "../components/homecarousel";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HomepageGallery from "../components/HomepageGallery";
const Home = () => {
  const data = {
    name: "instaura",
  };

  return (
    <>
      <Header />
      <HomeCarousel />
      <HeroSection myData={data} />
      <HomepageGallery />
      <Partnerbrands />
      <Footer />
    </>
  );
};

export default Home;
