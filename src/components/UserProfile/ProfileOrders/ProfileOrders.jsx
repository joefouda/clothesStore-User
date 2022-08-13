import './ProfileOrders.css'
import { Link } from 'react-router-dom'
import { DispatchUserContext, UserContext } from "../../../contexts/userContext"
import { Empty, Image, Popover, Descriptions, Button, Steps } from "antd"
import { CaretDownOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import ConfirmModal from './ConfirmModal'
import ProductPrice from '../../../shared/ProductPrice'
const { Step } = Steps;

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

const steps = [
    {
        id:1,
        title: 'Pending',
        status: 'wait',
        icon: <UserOutlined />
    },
    {
        id:2,
        title: 'Canceled',
        status: 'error',
    },
    {
        id:3,
        title: 'Shipped',
        status: 'wait',
        icon: <UserOutlined />
    },
    {
        id:4,
        title: 'Delivered',
        status: 'wait',
        icon: <UserOutlined />
    },
]


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
                    // set order current state on status track
                    let tempSteps = [...steps]
                    if (order.state !== 'canceled') {
                        tempSteps.splice(1, 1)
                        let currStepIndex = tempSteps.findIndex(step=> step.title.toLowerCase() === order.state)
                        for( let i = 0; i <= currStepIndex; i++){
                            tempSteps[i].status = 'finish'
                        }
                    } else {
                        let currStepIndex = tempSteps.findIndex(step=> step.title.toLowerCase() === order.state)
                        for( let i = 0; i < currStepIndex; i++){
                            tempSteps[i].status = 'finish'
                        }
                    }
                    return (
                        <div key={order._id} className="order-container">
                            <div className="order-header">
                                <div className='order-header-info'>
                                    <h1>Order Placed<br />{new Date(Date.parse(order.dateOrdered)).toLocaleString()}</h1>
                                    <h1>Total<br />{order.grandTotal}</h1>
                                    <h1>SHIP TO<br />{order.user.name}</h1>
                                    <ShippingAddress address={order.shippingAddress} />
                                </div>
                                <h1>ORDER # {order._id}</h1>
                            </div>
                            <Steps className='order-steps' current={1} status="error">
                                {tempSteps.map(step => (<Step key={step.id} status={step.status} title={step.title} icon={step.icon} />))}
                            </Steps>
                            <div className="order-body">
                                <div className="order-body-left">
                                    <h3>{order.state === 'delivered'?'delivered on':'arriving on'} {new Date(Date.parse(order.arrivingDate)).toLocaleDateString()}</h3>
                                    <div className="order-body-left-details">
                                        {order.orderItems.map(orderItem => (<><div key={orderItem._id} className="order-body-left-details-item">
                                            <Image className='order-body-left-details-item-image' src={orderItem.product.photos[0].src} />
                                            <Descriptions title={<Link to={`/${orderItem.product.category.name}/${orderItem.product.subCategory.name}/${orderItem.product.model}/${orderItem.product.name}/${orderItem.product._id}`}>{orderItem.product.name}</Link>} bordered>
                                                <Descriptions.Item label="Qauntity" span={3}>{orderItem.quantity}</Descriptions.Item>
                                                <Descriptions.Item label="Product Price" span={3}><ProductPrice product={orderItem.product} /></Descriptions.Item>
                                                <Descriptions.Item label="OrderItem total Price" span={3}>{orderItem.orderPrice}</Descriptions.Item>
                                                <Descriptions.Item label="Description" span={3}>{orderItem.product.description}</Descriptions.Item>
                                            </Descriptions>
                                        </div></>))}
                                    </div>
                                </div>
                                {order.state !== 'canceled' && order.state !== 'delivered'?<div className="order-body-right">
                                    <ConfirmModal id={order._id} />
                                </div>:''}
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}

export default ProfileOrders