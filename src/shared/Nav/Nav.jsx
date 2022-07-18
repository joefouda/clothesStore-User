import './Nav.css'
import PopOver from '../../components/PopOver'
import img from '../../assets/logo.jpg'
import CartPreview from '../../components/Cart/Cart';
import UserControl from '../../components/UserControl';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import useToggle from '../../hooks/useToggleState';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Drawer, Button, Badge } from 'antd';
import { CartContext } from '../../contexts/cartContext';

const Nav = () => {
  const [categories, setCategories] = useState([])
  const [cartVisable, ToggleCartVisable] = useToggle(false);
  const [userControlVisable, ToggleUserControlVisable] = useToggle(false);
  const cart = useContext(CartContext)

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
        <Badge size="default" count={cart.length}>
          <Button onClick={ToggleCartVisable} icon={<ShoppingCartOutlined />} size="large" />
        </Badge>
      </div>
      <Drawer title="Cart" width='25vw' placement="right" onClose={ToggleCartVisable} visible={cartVisable}>
        <CartPreview />
      </Drawer>

      <Drawer width='25vw' placement="right" onClose={ToggleUserControlVisable} visible={userControlVisable}>
        <UserControl />
      </Drawer>
    </div>
  )
};

export default Nav