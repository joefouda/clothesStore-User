import './MobileList.css'
import { Collapse, Button } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined, FormOutlined } from '@ant-design/icons'
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import authentication from '../../../auth/authentication';
import { DispatchContext } from '../../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../../contexts/favoriteContext';
import { DispatchUserContext } from '../../../contexts/userContext';
const { Panel } = Collapse;

const MobileList = (props) => {
  const dispatchUser = useContext(DispatchUserContext)
  const dispatchCart = useContext(DispatchContext)
  const dispatchFavorites = useContext(DispatchFavoriteContext)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.clear()
    dispatchUser({type:'CLEAR'})
    dispatchCart({type:'CLEAR'})
    dispatchFavorites({type:'CLEAR'})
    props.toggleMobileListVisable()
    navigate('/login')
  }
  return (
    <>
      <Collapse accordion className='list'>
        {props.categories.map(category => (<Panel header={category.name} key={category._id}>
          {category.subCategories.map(subCategory => (<Link key={subCategory._id} to={`/filter/${category.name}/${subCategory.name}`} onClick={props.toggleMobileListVisable}>{subCategory.name}</Link>))}
        </Panel>))}
      </Collapse>
      {authentication.isAuthinticated()?<div className='list-actions'>
        <Button icon={<UserOutlined />} className='list-actions-button' onClick={()=>{
          props.toggleMobileListVisable()
          navigate('/profile')
        }}>Profile</Button>
        <Button icon={<LogoutOutlined />} className='list-actions-button' onClick={handleLogout}>Logout</Button>
      </div>:<div className='list-actions'>
        <Button icon={<LoginOutlined />} className='list-actions-button' onClick={()=>{
          props.toggleMobileListVisable()
          navigate('/login')
        }}>Login</Button>
        <Button icon={<FormOutlined />} className='list-actions-button' onClick={()=>{
          props.toggleMobileListVisable()
          navigate('/signup')
        }}>Signup</Button>
      </div>
      }
    </>
  )
};

export default MobileList
