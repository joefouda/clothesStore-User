import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './MainCategories.css'
import {NotificationContext} from '../../../contexts/notificationContext'

const MainCategories = () => {
    const { openNotification } = useContext(NotificationContext)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/category').then((res) => {
            if(res.data.categories.length <= 4){
                setCategories(() => [...res.data.categories])
            } else {
                setCategories(() => [...res.data.categories.slice(0, 4)])
            }
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    }, [])
    return (
        <>
            <div className="main-categories-container">
                {categories.map(category => (
                    <div key={category._id} className='main-categories-item' style={{ backgroundImage: `url("${category.photo}")` }}>  
                        <span className='main-categories-item-content'>
                            <span className='main-categories-item-text'>{category.name}</span>
                            <Link to={`/filter/${category.name}`} >
                                <span className='main-categories-item-button'>Shop Now</span>
                            </Link>
                        </span>                      
                    </div>
                ))}
            </div>

        </>
    )
}

export default MainCategories