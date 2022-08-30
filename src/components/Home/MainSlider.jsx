import { Carousel } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NotificationContext } from '../../contexts/notificationContext';
import { Link } from 'react-router-dom'



const contentStyle = {
    height: '90vh',
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
    const { openNotification } = useContext(NotificationContext)
    const [displayedTitle, setDisplayedTitle] = useState('')
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
            setWebPhotos(res.data?.result?.photos || [])
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
        axios.get('http://localhost:3000/api/v1/other/mainSliderMobilePhotos').then((res)=>{
            setMobilePhotos(res.data?.result?.photos || [])
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    },[])

    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/mainList/displayedTitle/main-slider')
            .then(res=> {
                setDisplayedTitle(res.data.title)
            }).catch(()=> {
                openNotification('error', 'Server Error')
            })
    }, [])

    return (
        <Link to={`/filter/mainList/main-slider/${displayedTitle}`}>
            <Carousel effect='fade' autoplay autoplaySpeed={2000} dots={false}>
                {webView ? 
                webPhotos.map(photo=>(<div key={photo.id}>
                    <div style={{ ...contentStyle, backgroundImage: `url("${photo.src}")` }}>

                    </div>
                </div>)) : 
                mobilePhotos.map(photo=>(<div key={photo.id}>
                    <div style={{ ...contentStyle, backgroundImage: `url("${photo.src}")` }}>

                    </div>
                </div>))}
            </Carousel>
        </Link>
    )
};

export default MainSlider