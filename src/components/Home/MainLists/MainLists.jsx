import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../../../contexts/notificationContext'
import './MainLists.css'

const MainLists = ()=> {
    const { openNotification } = useContext(NotificationContext) 
    const [mainLists, setMainLists] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/mainList').then((res)=>{
            setMainLists(res.data.mainLists.slice(0,2))
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    }, [])
    return (
        <div className='main-lists-container'>
            {mainLists.map(item=> (
                <Link key={item._id} to={`/filter/mainList/${item.title}/${item.displayedTitle}`}>
                    <img className='main-list-photo' src={item.photo} />
                </Link>
            ))}
        </div>
    )
}

export default MainLists