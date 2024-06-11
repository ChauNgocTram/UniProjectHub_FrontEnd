import React from "react";

import Footer from "../../components/Footer/Footer";
import Hero from "../../components/HomeComponent/Hero";
import Intro from "../../components/HomeComponent/Intro";
import AboutTeam from "../../components/HomeComponent/AboutTeam";

function Home() {
  return (
    <>

     <Hero/>
     <Intro/>
     <AboutTeam/>
      <Footer />
    </>
  );
}

export default Home;
