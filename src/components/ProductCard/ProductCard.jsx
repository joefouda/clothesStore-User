import { Card, Badge } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductCard.css";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { DispatchFavoriteContext } from "../../contexts/favoriteContext";
import { FavoriteContext } from "../../contexts/favoriteContext";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/notificationContext";
import ProductPrice from '../../shared/ProductPrice'

const { Meta } = Card;

const ProductCard = (props) => {
  const { openNotification } = useContext(NotificationContext);
  const dispatchFavorite = useContext(DispatchFavoriteContext);
  const favorites = useContext(FavoriteContext);
  const { category, subCategory } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(
      `/${category || props.product.category.name}/${subCategory || props.product.subCategory.name
      }/${props.product.model.name}/${props.product.name}/${props.product._id}`
    );
  };

  const handleAddToFavorites = () => {
    dispatchFavorite({ type: "ADD", product: props.product });
    openNotification("success", "added to favorites successfully");
  };

  const handleRemoveFromFavorites = () => {
    dispatchFavorite({ type: "REMOVE", id: props.product._id });
    openNotification("success", "removed from favorites successfully");
  };

  return  (
    props.product.discountPercentage > 0 ?<Badge.Ribbon text="SALE" color="red">
      <Card
        hoverable
        cover={
          <img alt={props.product.name} src={props.product.photos[0].src} />
        }
        className="Product-Card"
        actions={[
          <EyeOutlined onClick={handleNavigate} />,
          favorites.findIndex((ele) => ele._id === props.product._id) === -1 ? (
            <HeartOutlined onClick={handleAddToFavorites} />
          ) : (
            <HeartFilled onClick={handleRemoveFromFavorites} />
          ),
        ]}
      >
        <Meta
          title={`${props.product.name}`}
          description={<ProductPrice product={props.product} />}
        />
      </Card>
    </Badge.Ribbon>: 
    <Card
      hoverable
      cover={<img alt={props.product.name} src={props.product.photos[0].src} />}
      className="Product-Card"
      actions={[
        <EyeOutlined onClick={handleNavigate} />,
        favorites.findIndex((ele) => ele._id === props.product._id) === -1 ? (
          <HeartOutlined onClick={handleAddToFavorites} />
        ) : (
          <HeartFilled onClick={handleRemoveFromFavorites} />
        ),
      ]}
    >
      <Meta
        title={`${props.product.name}`}
        description={<ProductPrice product={props.product} />}
      />
    </Card>
  );
};

export default ProductCard;
