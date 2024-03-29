import './Nav.css'
import PopOver from '../../components/NavButtonsContent/popover/PopOver'
import img from '../../assets/logo.jpg'
import CartPreview from '../../components/Cart/Cart';
import UserControl from '../../components/UserControl/UserControl';
import Favorites from '../../components/NavButtonsContent/Favorites';
import SearchContent from '../../components/NavButtonsContent/SearchContent/SearchContent';
import MobileList from './MobileList/MobileList';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import useToggle from '../../hooks/useToggleState';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Drawer, Badge } from 'antd';
import { CartContext } from '../../contexts/cartContext';
import { CartVisableContext } from '../../contexts/cartContext';
import { FavoriteContext } from '../../contexts/favoriteContext';
import { NotificationContext } from '../../contexts/notificationContext';

const Nav = () => {
  const { openNotification } = useContext(NotificationContext)
  const [categories, setCategories] = useState([])
  const [specialNavItem, setSpecialNavItem] = useState('')
  const [userControlVisable, ToggleUserControlVisable] = useToggle(false);
  const [mobileListVisable, toggleMobileListVisable] = useToggle(false);
  const [searchVisable, toggleSearchVisable] = useToggle(false);
  const [favoriteVisable, ToggleFavoriteVisable] = useToggle(false);
  const cart = useContext(CartContext)
  const { cartVisable, toggleCartVisable } = useContext(CartVisableContext)
  const favorites = useContext(FavoriteContext)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category').then((res) => {
      setCategories(() => [...res.data.categories])
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/mainList/displayedTitle/nav-link')
      .then(res => {
        setSpecialNavItem(res.data.title)
      }).catch(() => {
        openNotification('error', 'Server Error')
      })
  }, [])

  return (
    <>
    <div className='Nav'>
      <div className='logo-section'>
        <div className='Nav-buttons'>
          <UnorderedListOutlined className='Nav-mobile-nav Nav-icon' onClick={toggleMobileListVisable} />
          <UserOutlined className='Nav-normal-nav Nav-icon' onClick={ToggleUserControlVisable} />
          <SearchOutlined className='Nav-icon' onClick={toggleSearchVisable}/>
        </div>
        <div>
          <Link to='/'><img src={img} style={{ maxWidth: '132px' }} /></Link>
        </div>
        <div className='Nav-buttons'>
          <Badge size="default" count={favorites.length} style={{ zIndex: 1 }}>
            <HeartOutlined className='Nav-icon' onClick={ToggleFavoriteVisable} />
          </Badge>
          <Badge size="default" count={cart.length}>
            <ShoppingCartOutlined className='Nav-icon' onClick={toggleCartVisable} />
          </Badge>
        </div>
      </div>

      <div className="Nav-normal-nav Nav-links">
        <Link to={`/filter/mainList/nav-link/${specialNavItem}`}><span className='nav-link' style={{ color: '#C71A3A' }}>{specialNavItem}</span></Link>
        {categories.map(category => <PopOver key={category._id} category={category} title={category.name} />)}
      </div>
    </div>

    <Drawer title="Cart" placement="right" onClose={toggleCartVisable} visible={cartVisable}>
      <CartPreview />
    </Drawer>

    <Drawer placement="left" onClose={ToggleUserControlVisable} visible={userControlVisable}>
      <UserControl ToggleUserControlVisable={ToggleUserControlVisable} />
    </Drawer>

    <Drawer placement="right" onClose={ToggleFavoriteVisable} visible={favoriteVisable}>
      <Favorites ToggleFavoriteVisable={ToggleFavoriteVisable} />
    </Drawer>

    <Drawer placement="left" onClose={toggleMobileListVisable} visible={mobileListVisable}>
      <MobileList toggleMobileListVisable={toggleMobileListVisable} categories={categories} />
    </Drawer>

    <Drawer placement='left' onClose={toggleSearchVisable} visible={searchVisable}>
      <SearchContent toggleSearchVisable={toggleSearchVisable} />
    </Drawer>
    </>
  )
};

export default Nav