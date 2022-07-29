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
import { Drawer, Button, Badge } from 'antd';
import { CartContext } from '../../contexts/cartContext';
import { CartVisableContext } from '../../contexts/cartContext';
import { FavoriteContext } from '../../contexts/favoriteContext';

const Nav = () => {
  const [categories, setCategories] = useState([])
  const [searchPlacement, setSearchPlacement] = useState(window.matchMedia('(max-width: 1000px)').matches)
  const [userControlVisable, ToggleUserControlVisable] = useToggle(false);
  const [mobileListVisable, toggleMobileListVisable] = useToggle(false);
  const [mobileSearchVisable, ToggleMobileSearchVisable] = useToggle(false);
  const [favoriteVisable, ToggleFavoriteVisable] = useToggle(false);
  const cart = useContext(CartContext)
  const { cartVisable, toggleCartVisable } = useContext(CartVisableContext)
  const favorites = useContext(FavoriteContext)

  const handleSearchPlacement = ()=>{
    setSearchPlacement(window.matchMedia('(max-width: 1000px)').matches)
    ToggleMobileSearchVisable()
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category').then((res) => {
      setCategories(() => [...res.data.categories])
    })
  }, [])
  return (
    <div className='Nav'>
      <div className='Nav-mobile-nav Nav-buttons'>
        <UnorderedListOutlined className='Nav-icon' onClick={toggleMobileListVisable} />
        <SearchOutlined className='Nav-icon' onClick={handleSearchPlacement} />
      </div>
        <div className='Nav-start'>
        <Link to='/'><img src={img} style={{ maxWidth: '132px' }} /></Link>
        <div className="Nav-normal-nav Nav-links">
          {categories.map(category => <PopOver key={category._id} category={category} title={category.name} />)}
        </div>
      </div>
      <div className='Nav-buttons'>
        <SearchOutlined className='Nav-normal-nav Nav-icon' onClick={handleSearchPlacement} />
        <UserOutlined className='Nav-normal-nav Nav-icon' onClick={ToggleUserControlVisable} />
        <Badge size="default" count={favorites.length} style={{zIndex:1}}>
          <HeartOutlined className='Nav-icon' onClick={ToggleFavoriteVisable} />
        </Badge>
        <Badge size="default" count={cart.length}>
          <ShoppingCartOutlined className='Nav-icon' onClick={toggleCartVisable} />
        </Badge>
      </div>
      <Drawer title="Cart" placement="right" onClose={toggleCartVisable} visible={cartVisable}>
        <CartPreview />
      </Drawer>

      <Drawer placement="right" onClose={ToggleUserControlVisable} visible={userControlVisable}>
        <UserControl ToggleUserControlVisable={ToggleUserControlVisable} />
      </Drawer>

      <Drawer placement="right" onClose={ToggleFavoriteVisable} visible={favoriteVisable}>
        <Favorites ToggleFavoriteVisable={ToggleFavoriteVisable} />
      </Drawer>

      <Drawer placement="left" onClose={toggleMobileListVisable} visible={mobileListVisable}>
        <MobileList toggleMobileListVisable={toggleMobileListVisable} categories={categories}/>
      </Drawer>

      <Drawer placement={searchPlacement?'left':'right'} onClose={ToggleMobileSearchVisable} visible={mobileSearchVisable}>
        <SearchContent ToggleMobileSearchVisable={ToggleMobileSearchVisable} />
      </Drawer>

    </div>
  )
};

export default Nav