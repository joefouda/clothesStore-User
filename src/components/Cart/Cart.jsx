import './Cart.css'
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { DispatchContext } from '../../contexts/cartContext';
import { CartContext } from '../../contexts/cartContext';
import { CartVisableContext } from '../../contexts/cartContext';
import { NotificationContext } from '../../contexts/notificationContext';
import { List, Empty, Button, Divider } from 'antd';
import EditModal from './EditModal/EditModal';
import ProductPrice from '../../shared/ProductPrice';

const CartPreview = () => {
    const navigate = useNavigate()
    const { openNotification } = useContext(NotificationContext)
    const {toggleCartVisable} = useContext(CartVisableContext)
    const cart = useContext(CartContext)
    const dispatch = useContext(DispatchContext)

    const handleCheckout = ()=>{
        toggleCartVisable()
        navigate('/checkout')
    }
    return (
        cart.length === 0 ? <Empty
            description={
                <span>
                    Your Cart is Empty
                </span>
            }
        >
        </Empty> :
            <>
                <List
                    itemLayout="vertical"
                    dataSource={cart}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <EditModal key="list-loadmore-edit" orderItem={item}/>,
                                <Button key="list-removeitem-remove" onClick={()=>{
                                    let orderItemId = item._id || ''
                                    dispatch({ type: 'REMOVE', orderItemId, id: item.product._id })
                                    openNotification('success', 'removed from Cart successfully')
                                }}>remove</Button>
                            ]}
                            extra={
                                <img
                                    width='100%'
                                    height='auto'
                                    alt="logo"
                                    src={item?.selectedColor?.photos[0]?.src}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<Link to={`/${item.product.category.name}/${item.product.subCategory.name}/${item.product.name}/${item.product._id}`} >{item.product.name}</Link>}
                                description={`quantity: ${item.quantity}`}
                            />
                            <ProductPrice product={item.product}/>
                            <p>Size : {item.selectedSize} &nbsp; color: <div style={{display:'inline-block', height: '1vw', width: '2vw', backgroundColor:item.selectedColor.color}}></div></p>
                    
                        </List.Item>
                    )}
                />
                <Divider />
                <div className='order-total'>
                    <p>Order Total (Execluding Delivary)</p>
                    <span>LE {cart.reduce((total, ele) => (total + ele.orderPrice), 0)}</span>
                </div>
                <div className='order-actions'>
                    <Button className='checkout-button' onClick={handleCheckout}>
                        Checkout
                    </Button>
                </div>
            </>
    )
};

export default CartPreview;