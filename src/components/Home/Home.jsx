import MainSlider from "../MainSlider";
import MainCategories from "../MainCategories/MainCategories";
import { Layout } from 'antd';
import React from 'react';

const { Footer } = Layout;

const Home = () => (
  <>
    <MainSlider />
    <MainCategories />
    <Footer style={{ textAlign: 'center' }}>BUTRO'N ©2022 Created by joeFouda</Footer>
  </>
);

export default Home