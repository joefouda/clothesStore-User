import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { DispatchUserContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import axios from 'axios'


const ConfirmModal = (props) => {
    const dispatchUser = useContext(DispatchUserContext)
    const confirm = () => {
        const handleCancel = ()=> {
            axios.put(`http://localhost:3000/api/v1/order/${props.id}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => {
                dispatchUser({ type: 'SET', user: res.data.user })
            })
        }
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'are you sure you want to cancel this order ?',
            okText: 'confirm cancel',
            cancelText: 'discard',
            okType:'danger',
            onOk:handleCancel
        });
    };

    return (
        <Space>
            <Button type='danger' onClick={confirm}>cancel order</Button>
        </Space>
    )
};

export default ConfirmModal;