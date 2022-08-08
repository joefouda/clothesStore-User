import './ProfileOrders.css'
import { useContext } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from "../../../contexts/userContext"
import { Empty, Image, Popover, Descriptions } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'
import OrderState from './OrderState/OrderState'

const ShippingAddress = (props) => {
    const content = (
        <>
            <h3>country / {props.address.country}</h3>
            <h3>province / {props.address.province}</h3>
            <h3>street / {props.address.street}</h3>
            <h3>details / {props.address.details}</h3>
        </>
    )
    return (
        <Popover content={content} placement="bottom">
            <h1 style={{ cursor: 'pointer', alignSelf: 'end' }}>Address <CaretDownOutlined /></h1>
        </Popover>
    )
}


const ProfileOrders = () => {
    const user = useContext(UserContext)
    return (
        user.orders.length === 0 ? <Empty
            description={
                <span>
                    No Orders yet
                </span>
            }
        >
        </Empty> :
            <div className='orders-container'>
                {user.orders.map(order => {
                    let orderedDate = new Date(Date.parse(order.dateOrdered))
                    let arrivingDate = new Date(Date.parse(order.dateOrdered))
                    arrivingDate.setDate(orderedDate.getDate() + 3)
                    return (
                        <div key={order._id} className="order-container">
                            <div className="order-header">
                                <div className='order-header-info'>
                                    <h1>Order Placed<br />{orderedDate.toLocaleString()}</h1>
                                    <h1>Total<br />{order.grandTotal}</h1>
                                    <h1>SHIP TO<br />{order.user.name}</h1>
                                    <ShippingAddress address={order.shippingAddress} />
                                </div>
                                <h1>ORDER # {order._id}</h1>
                            </div>
                            <div className="order-body">
                                <div className="order-body-left">
                                    <h1 style={{ fontSize: '25px', margin: 0 }}>{order.state}</h1>
                                    <h3>arriving on {arrivingDate.toLocaleDateString()}</h3>
                                    <div className="order-body-left-details">
                                        {order.orderItems.map(orderItem => (<><div key={orderItem._id} className="order-body-left-details-item">
                                            <Image className='order-body-left-details-item-image' src={orderItem.product.photos[0].src} />
                                            <Descriptions title={<Link to={`/${orderItem.product.category.name}/${orderItem.product.subCategory.name}/${orderItem.product.model}/${orderItem.product.name}/${orderItem.product._id}`}>{orderItem.product.name}</Link>} bordered>
                                                <Descriptions.Item label="Qauntity" span={3}>{orderItem.quantity}</Descriptions.Item>
                                                <Descriptions.Item label="Product Price" span={3}>{orderItem.product.price}</Descriptions.Item>
                                                <Descriptions.Item label="OrderItem total Price" span={3}>{orderItem.orderPrice}</Descriptions.Item>
                                                <Descriptions.Item label="Description" span={3}>{orderItem.product.description}</Descriptions.Item>
                                            </Descriptions>
                                        </div></>))}
                                    </div>
                                </div>
                                <div className="order-body-right">
                                    <OrderState state={order.state} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}

export default ProfileOrders