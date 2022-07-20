import './Nav.css'
import PopOver from '../../components/PopOver'
import img from '../../assets/logo.jpg'
import CartPreview from '../../components/Cart/Cart';
import UserControl from '../../components/UserControl/UserControl';
import Favorites from '../../components/Favorites';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import useToggle from '../../hooks/useToggleState';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Drawer, Button, Badge } from 'antd';
import { CartContext } from '../../contexts/cartContext';
import { FavoriteContext } from '../../contexts/favoriteContext';

const Nav = () => {
  const [categories, setCategories] = useState([])
  const [cartVisable, ToggleCartVisable] = useToggle(false);
  const [userControlVisable, ToggleUserControlVisable] = useToggle(false);
  const [favoriteVisable, ToggleFavoriteVisable] = useToggle(false);
  const cart = useContext(CartContext)
  const favorites = useContext(FavoriteContext)

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category').then((res) => {
      setCategories(() => [...res.data.categories])
    })
  }, [])
  return (
    <div className='Nav'>
      <div className='Nav-start'>
        <Link to='/'><img src={img} style={{ maxWidth: '132px' }} /></Link>
        <div className="Nav-links">
          {categories.map(category => <PopOver key={category._id} category={category} title={category.name} />)}
        </div>
      </div>
      <div className='Nav-buttons'>
        <Button onClick={ToggleUserControlVisable} icon={<UserOutlined />} size="large" />
        <Badge size="default" count={favorites.length} style={{zIndex:1}}>
          <Button onClick={ToggleFavoriteVisable} icon={<HeartOutlined />} size="large" />
        </Badge>
        <Badge size="default" count={cart.length}>
          <Button onClick={ToggleCartVisable} icon={<ShoppingCartOutlined />} size="large" />
        </Badge>
      </div>
      <Drawer title="Cart" width='25vw' placement="right" onClose={ToggleCartVisable} visible={cartVisable}>
        <CartPreview ToggleCartVisable={ToggleCartVisable}/>
      </Drawer>

      <Drawer width='25vw' placement="right" onClose={ToggleUserControlVisable} visible={userControlVisable}>
        <UserControl ToggleUserControlVisable={ToggleUserControlVisable} />
      </Drawer>

      <Drawer width='25vw' placement="right" onClose={ToggleFavoriteVisable} visible={favoriteVisable}>
        <Favorites ToggleFavoriteVisable={ToggleFavoriteVisable} />
      </Drawer>
    </div>
  )
};

export default Nav