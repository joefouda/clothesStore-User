import { Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductCard.css'
import { EyeOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { FavoriteContext } from '../../contexts/favoriteContext';
import { useContext } from 'react';
import { NotificationContext } from '../../contexts/notificationContext';

const { Meta } = Card;

const ProductCard = (props) => {
  const {openNotification} = useContext(NotificationContext)
  const dispatchFavorite = useContext(DispatchFavoriteContext)
  const favorites = useContext(FavoriteContext)
  const {category, subCategory} = useParams()
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate(`/${category}/${subCategory}/${props.product.model}/${props.product.name}/${props.product._id}`)
  }

  const handleAddToFavorites = ()=>{
    dispatchFavorite({type:'ADD', product:props.product})
    openNotification('success', 'added to favorites successfully')
  }

  const handleRemoveFromFavorites = ()=>{
    dispatchFavorite({type:'REMOVE', id:props.product._id})
    openNotification('success', 'removed from favorites successfully')
  }
  
  return (
  <Card
    hoverable
    style={{ maxWidth: '17vw' }}
    cover={<img alt={props.product.name} src={props.product.photo} />}
    actions={[
      <EyeOutlined onClick={handleNavigate}/>,
      favorites.findIndex(ele=>ele._id === props.product._id) === -1?<HeartOutlined onClick={handleAddToFavorites}/>:<HeartFilled onClick={handleRemoveFromFavorites}/>
    ]}
  >
    <Meta title={`${props.product.name} - ${props.product.price} LE`} description={props.product.description} />
  </Card>
  )
};

export default ProductCard;