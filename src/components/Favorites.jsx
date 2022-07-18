import { List, Empty } from 'antd';
import React, { useContext } from 'react';
import { DispatchFavoriteContext } from '../contexts/favoriteContext';
import { FavoriteContext } from '../contexts/favoriteContext';
import { NotificationContext } from '../contexts/notificationContext';

const Favorites = () => {
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
                                    src={item.photo}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={`price: ${item.price}`}
                            />
                            {item.specs.reduce((total, ele, index) => {
                                if (index === item.specs.length - 1) return total + `${ele.name}: ${ele.value}`
                                return total + `${ele.name}: ${ele.value}, `
                            }, '')}
                        </List.Item>
                    )}
                />
            </>
    )
};

export default Favorites;