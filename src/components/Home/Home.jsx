import './Home.css'
import MainSlider from "./MainSlider";
import MainCategories from "./MainCategories/MainCategories";
import FeaturedSection from './FeaturedSection/FeaturedSection';
import MainLists from './MainLists/MainLists';
import React from 'react';


const Home = () => (
  <div className="home-container">
    <MainSlider />
    <MainLists />
    <FeaturedSection />
    <MainCategories />
  </div>
);

export default Home