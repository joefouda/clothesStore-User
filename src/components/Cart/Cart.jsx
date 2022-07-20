import './Cart.css'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { DispatchContext } from '../../contexts/cartContext';
import { CartContext } from '../../contexts/cartContext';
import { NotificationContext } from '../../contexts/notificationContext';
import { List, Empty, Button, Divider } from 'antd';

const CartPreview = () => {
    const navigate = useNavigate()
    const { openNotification } = useContext(NotificationContext)
    const cart = useContext(CartContext)
    const dispatch = useContext(DispatchContext)
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
                                <a key="list-loadmore-edit">edit</a>,
                                <a key="list-removeitem-remove" onClick={()=>{
                                    let orderItemId = item._id || ''
                                    dispatch({ type: 'REMOVE', orderItemId, id: item.product._id })
                                    openNotification('success', 'removed from Cart successfully')
                                }}>remove</a>
                            ]}
                            extra={
                                <img
                                    width='100%'
                                    height='auto'
                                    alt="logo"
                                    src={item.product.photo}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.product.name}</a>}
                                description={`quantity: ${item.quantity}, price: ${item.product.price}`}
                            />
                            {item.product.specs.reduce((total, ele, index) => {
                                if (index === item.product.specs.length - 1) return total + `${ele.name}: ${ele.value}`
                                return total + `${ele.name}: ${ele.value}, `
                            }, '')}
                        </List.Item>
                    )}
                />
                <Divider />
                <div className='order-total'>
                    <p>Order Total (Execluding Delivary)</p>
                    <span>LE {cart.reduce((total, ele) => (total + ele.orderPrice), 0)}</span>
                </div>
                <div className='order-actions'>
                    <Button className='view-button'>
                        View Cart
                    </Button>
                    <Button className='checkout-button' onClick={()=> navigate('/checkout')}>
                        Checkout
                    </Button>
                </div>
            </>
    )
};

export default CartPreview;