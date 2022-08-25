import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../../../contexts/notificationContext'
import './MainLists.css'

const MainLists = ()=> {
    const { openNotification } = useContext(NotificationContext) 
    const [mainLists, setMainLists] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/other/mainLists').then((res)=>{
            setMainLists(res.data?.result?.MainLists || [])
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    }, [])
    return (
        <div className='main-lists-container'>
            {mainLists.map(item=> (
                <Link to={`/filter/specialCategory/${item.title}`}>
                    <img className='main-list-photo' src={item.photo} />
                </Link>
            ))}
        </div>
    )
}

export default MainLists