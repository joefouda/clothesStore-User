import './Checkout.css'
import { Button, Steps } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import MainWrapper from '../../shared/main-wrapper';
import AddressContent from './AdressContent/AddressContent'
import OrderItemsContent from './OrderItemsContent/OrderItemsContent'; 
import PaymentMethodContent from './PaymentMethodContent/PaymentMethodContent';
import { UserContext } from '../../contexts/userContext';
import { DispatchUserContext } from '../../contexts/userContext';
import { CartContext } from '../../contexts/cartContext';
import { DispatchContext } from '../../contexts/cartContext';
import axios from 'axios'
import { NotificationContext } from '../../contexts/notificationContext';
const { Step } = Steps;

const Checkout = () => {
    const { openNotification } = useContext(NotificationContext)
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const dispatchUser = useContext(DispatchUserContext)
    const cart = useContext(CartContext)
    const dispatchCart = useContext(DispatchContext)
    const [current, setCurrent] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery')
    const [shippingAddress, setShippingAddress] = useState(user.address)
    const [currentGovernorate, setCurrentGovernorate] = useState({})

    const steps = [
        {
            title: 'Shipping Address',
            content: <AddressContent setShippingAddress={setShippingAddress} shippingAddress={shippingAddress} />,
        },
        {
            title: 'Order Items',
            content: <OrderItemsContent currentGovernorate={currentGovernorate} />,
        },
        {
            title: 'Payment Method',
            content: <PaymentMethodContent setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod}/>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleCheckout = ()=> {
        console.log(cart)
        let order = {
            orderItems : [...cart],
            shippingAddress,
            paymentMethod,
            grandTotal:currentGovernorate.shippingCost + cart.reduce((st,next)=>st+next.orderPrice,0),
        }
        axios.post('http://localhost:3000/api/v1/order',order, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res=> {
            dispatchUser({type:'SET', user:res.data.user})
            dispatchCart({type:'PERMENANTCLEAR'})
            openNotification('success', 'Your order is placed succesfully')
            navigate('/profile')
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    }

    useEffect(()=> {
        axios.get(`http://localhost:3000/api/v1/address`).then((res)=> {
            setCurrentGovernorate(res.data.addresses.find(address=> {
                return address.governorate === shippingAddress.province
            }))
        })
    },[])

    return (
        <MainWrapper>
            <div className='checkout-container'>
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button
                        icon={<ArrowLeftOutlined />}
                        className='previous-step-button'
                        onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button className='next-step-button' onClick={handleCheckout}>
                            Checkout
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button icon={<ArrowRightOutlined />} className='next-step-button' onClick={() => next()}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </MainWrapper>
    );
};

export default Checkout;