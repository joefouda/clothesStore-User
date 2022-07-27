import { Button, Modal, InputNumber  } from 'antd';
import { useState } from 'react';
import useToggle from '../../../hooks/useToggleState';
import { DispatchContext } from '../../../contexts/cartContext';
import { NotificationContext } from '../../../contexts/notificationContext';
import authentication from '../../../auth/authentication';
import axios from 'axios'
import { useContext } from 'react';
import { useEffect } from 'react';


const EditModal = (props) => {
    const { openNotification } = useContext(NotificationContext)
    const dispatchCart = useContext(DispatchContext)
    const [modalVisible, toggleModalVisible] = useToggle(false)
    const [quantity, setQuantity] = useState(props.orderItem.quantity)
    const handleChange = (value)=>{
        setQuantity(value)
    }
    const handleSubmit = ()=>{
        if(authentication.isAuthinticated()){
            axios.put('http://localhost:3000/api/v1/orderitem',{orderItemID:props.orderItem._id, quantity, orderPrice:props.orderItem.product.price*quantity}).then(res=>{
                dispatchCart({type:'UPDATE', orderItem:res.data.orderItem})
                openNotification('success', 'quantity updated successfully')
                console.log(res.data.orderItem)
            })
        }else {
            dispatchCart({type:'UPDATE', id:props.orderItem.product._id, quantity, orderPrice:props.orderItem.product.price*quantity})
            openNotification('success', 'quantity updated successfully')
        }
        toggleModalVisible()
    }
    const handleCancel = ()=>{
        setQuantity(props.orderItem.quantity)
        toggleModalVisible()
    }

    useEffect(()=>{

    })
    return (
        <>
            <Button onClick={toggleModalVisible}>Edit</Button>
            <Modal
                title='Edit Order Item Quantity'
                centered
                visible={modalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
            >
                <InputNumber min={1} max={props.orderItem.product.stock} value={quantity} onChange={handleChange}/>
            </Modal>
            
        </>
    )

};

export default EditModal;