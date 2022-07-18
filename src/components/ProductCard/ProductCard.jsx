import { Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductCard.css'
import { EyeOutlined, HeartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductCard = (props) => {
  const {category, subCategory} = useParams()
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate(`/filter/${category}/${subCategory}/${props.product.name}/${props.product.model}/${props.product._id}`)
  }
  return (<Card
    hoverable
    style={{ maxWidth: '17vw' }}
    cover={<img alt={props.product.name} src={props.product.photo} />}
    actions={[
      <EyeOutlined onClick={handleNavigate}/>,
      <HeartOutlined />
    ]}
  >
    <Meta title={`${props.product.name} - ${props.product.price} LE`} description={props.product.description} />
  </Card>)
};

export default ProductCard;