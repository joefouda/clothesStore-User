import './UserControl.css'
import { Button } from 'antd';
import Login from '../Login/Login';
import authentication from '../../auth/authentication';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { useContext } from 'react';

const UserControl = (props) => {
    const dispatch = useContext(DispatchContext)
    const dispatchFavorites = useContext(DispatchFavoriteContext)
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.clear()
        dispatch({type:'CLEAR'})
        dispatchFavorites({type:'CLEAR'})
        props.ToggleUserControlVisable()
        navigate('/login')
    }
    return (
        authentication.isAuthinticated()?<Button className='logout-button' onClick={handleLogout} type="link">Logout</Button>:<Login ToggleUserControlVisable={props.ToggleUserControlVisable}/>
    )
};

export default UserControl