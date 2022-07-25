import './UserControl.css'
import { Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import Login from '../Login/Login';
import authentication from '../../auth/authentication';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { DispatchUserContext } from '../../contexts/userContext';
import { useContext } from 'react';

const AuthenticatedContent = (props) => {
    const dispatchUser = useContext(DispatchUserContext)
    const dispatch = useContext(DispatchContext)
    const dispatchFavorites = useContext(DispatchFavoriteContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        dispatchUser({ type: 'CLEAR' })
        dispatch({ type: 'CLEAR' })
        dispatchFavorites({ type: 'CLEAR' })
        props.ToggleUserControlVisable()
        navigate('/login')
    }
    return (
        <div className='list-actions'>
            <Button icon={<UserOutlined />} className='list-actions-button' onClick={() => {
                props.ToggleUserControlVisable()
                navigate('/profile')
            }}>Profile</Button>
            <Button icon={<LogoutOutlined />} className='list-actions-button' onClick={handleLogout}>Logout</Button>
        </div>
    )
}

const UserControl = (props) => {
    return (
        authentication.isAuthinticated() ? <AuthenticatedContent ToggleUserControlVisable={props.ToggleUserControlVisable} /> : <Login ToggleUserControlVisable={props.ToggleUserControlVisable} />
    )
};

export default UserControl