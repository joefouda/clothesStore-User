import './UserControl.css'
import { Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import Login from '../Login/Login';
import authentication from '../../auth/authentication';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { useContext } from 'react';

const AuthenticatedContent = (props)=>{
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
        <>
            <Button className='control-button' icon={<UserOutlined />} onClick={()=>{
                navigate('/profile')
                props.ToggleUserControlVisable()
            }}>Profile</Button>
            <Divider />
            <Button className='control-button' icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
        </>
    )
}

const UserControl = (props) => {
    return (
        authentication.isAuthinticated()?<AuthenticatedContent ToggleUserControlVisable={props.ToggleUserControlVisable} />:<Login ToggleUserControlVisable={props.ToggleUserControlVisable}/>
    )
};

export default UserControl