import './Home.css'
import MainSlider from "./MainSlider";
import MainCategories from "./MainCategories/MainCategories";
import React from 'react';


const Home = () => (
  <div className="home-container">
    <MainSlider />
    <MainCategories />
  </div>
);

export default Home