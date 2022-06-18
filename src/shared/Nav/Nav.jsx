import './Nav.css'
import PopOver from '../PopOver'
import img from '../../assets/logo.jpg'
import CartPreview from '../../components/CartPreview';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
const categories = [{id:1,name:'shoes'},{id:2,name:'suits'},{id:3,name:'T-shirt'},{id:4,name:'shirt'}]
const Nav = () => (

  <div className='Nav'>
    <div className='Nav-start'>
      <img src={img} style={{maxWidth:'132px'}}/>
      <div className="Nav-links">
        {categories.map(category=><PopOver key={category.id} title={category.name}/>)}
      </div>
    </div>
    <div className='Nav-buttons'>
      <PopOver title={<UserOutlined />}/>
      <PopOver title={<ShoppingCartOutlined />} content={<CartPreview />} for='cart'/>
    </div>
  </div>
);

export default Nav