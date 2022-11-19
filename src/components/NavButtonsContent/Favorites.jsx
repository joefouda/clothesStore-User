import { List, Empty } from 'antd';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { FavoriteContext } from '../../contexts/favoriteContext';
import { NotificationContext } from '../../contexts/notificationContext';
import ProductPrice from '../../shared/ProductPrice';

const Favorites = (props) => {
    const {openNotification} = useContext(NotificationContext)
    const favorites= useContext(FavoriteContext)
    const dispatchFavorite = useContext(DispatchFavoriteContext)
    return (
        favorites.length === 0 ? <Empty
            description={
                <span>
                    No Items In you List
                </span>
            }
        >
        </Empty> :
            <>
                <List
                    itemLayout="vertical"
                    dataSource={favorites}
                    renderItem={item => (
                        <List.Item
                            actions={[ <a key="list-removeitem-remove" onClick={()=>{
                                dispatchFavorite({ type: 'REMOVE', id: item._id })
                                openNotification('success', 'removed from favorites successfully')
                            }}>remove</a>]}
                            extra={
                                <img
                                    width='100%'
                                    height='auto'
                                    alt="logo"
                                    src={item.colors[0].photos[0].src}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<Link to={`/${item.category.name}/${item.subCategory.name}/${item.name}/${item._id}`} onClick={()=>props.ToggleFavoriteVisable()}>{item.name}</Link>}
                            />
                            <ProductPrice product={item} />
                        </List.Item>
                    )}
                />
            </>
    )
};

export default Favorites;