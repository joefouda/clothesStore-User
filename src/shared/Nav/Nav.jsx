import './Nav.css'
import PopOver from '../PopOver'
import img from '../../assets/logo.jpg'
import CartPreview from '../../components/CartPreview';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Nav = () => {
  const [categories,setCategories] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category').then((res) => {
      setCategories(() => [...res.data.categories])
    })
  },[])
  return (
    <div className='Nav'>
      <div className='Nav-start'>
        <img src={img} style={{ maxWidth: '132px' }} />
        <div className="Nav-links">
          {categories.map(category => <PopOver key={category._id} category={category} title={category.name} />)}
        </div>
      </div>
      <div className='Nav-buttons'>
        <PopOver title={<UserOutlined />} content={<div>user setting</div>}/>
        <PopOver title={<ShoppingCartOutlined />} content={<CartPreview />} for='cart' />
      </div>
    </div>

  )
};

export default Nav