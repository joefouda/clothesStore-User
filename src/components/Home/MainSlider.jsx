import { Carousel } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const contentStyle = {
    height: '80vh',
    color: '#fff',
    textAlign: 'center',
    backgroundSize:'cover',
    lineHeight: '8rem',
    fontSize: '10rem',
    fontFamily: 'Sans-serif',
    color: 'white',
    display: 'flex'
};

const MainSlider = () => {
    const [webPhotos, setWebPhotos] = useState([])
    const [mobilePhotos, setMobilePhotos] = useState([])
    const [webView, setWebView] = useState(window.matchMedia('(min-width: 1000px)').matches)
    const handleResize = () => {
        setWebView(window.matchMedia('(min-width: 1000px)').matches)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/other/mainSliderWebPhotos').then((res)=>{
            setWebPhotos(res.data?.mainSlider?.photos || [])
        })
        axios.get('http://localhost:3000/api/v1/other/mainSliderMobilePhotos').then((res)=>{
            setMobilePhotos(res.data?.mainSlider?.photos || [])
        })
    },[])
    return (
        <Carousel effect='fade' autoplay autoplaySpeed={2000} dots={false}>
            {webView ? 
            webPhotos.map(photo=>(<div key={photo.id}>
                <div style={{ ...contentStyle, backgroundImage: `url(${photo.src})` }}>

                </div>
            </div>)) : 
            mobilePhotos.map(photo=>(<div key={photo.id}>
                <div style={{ ...contentStyle, backgroundImage: `url(${photo.src})` }}>

                </div>
            </div>))}
        </Carousel>
    )
};

export default MainSlider