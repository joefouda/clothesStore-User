import './Checkout.css'
import { Button, message, Steps } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import MainWrapper from '../../shared/main-wrapper';
import AddressContent from './AdressContent/AddressContent'
const { Step } = Steps;
const steps = [
    {
        title: 'Shipping Address',
        content: <AddressContent />,
    },
    {
        title: 'Order Items',
        content: 'Second-content',
    },
    {
        title: 'Payment Method',
        content: 'Last-content',
    },
];

const Checkout = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

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
                        <Button className='next-step-button' onClick={() => message.success('Processing complete!')}>
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