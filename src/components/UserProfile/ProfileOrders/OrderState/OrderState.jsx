import './OrderState.css'
import { UserOutlined } from '@ant-design/icons';
import { Steps, Button, Modal } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import useToggle from '../../../../hooks/useToggleState';
const { Step } = Steps;

const steps = [
    {
        id:1,
        title: 'Pending',
        status: 'wait',
        icon: <UserOutlined />
    },
    {
        id:2,
        title: 'On the way',
        status: 'wait',
        icon: <UserOutlined />
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

const OrderState = (props) => {
    const [modalVisible, toggleModalVisible] = useToggle(false)
    useEffect(()=> {
        let currStepIndex = steps.findIndex(step=> step.title.toLowerCase() === props.state)
        for( let i = 0; i <= currStepIndex; i++){
            steps[i].status = 'finish'
        }
    }, [])
    return (
        <>
            <Button className='order-track-button' onClick={toggleModalVisible}>Track Your order</Button>
            <Modal
                title='current Order State'
                centered
                visible={modalVisible}
                onOk={toggleModalVisible}
                onCancel={toggleModalVisible}
            >
                <Steps direction='vertical' style={{height:'100%'}}>
                    {steps.map(step=>(<Step key={step.id} status={step.status} title={step.title} icon={step.icon} />))}
                </Steps>
            </Modal>
            
        </>
    )

};

export default OrderState;