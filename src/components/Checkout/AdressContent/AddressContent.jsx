import './AddressContent.css'
import { Form, Input, Button, Cascader, Divider  } from 'antd'
import residences from "../../../shared/residences"
import { UserContext } from '../../../contexts/userContext';
import { useContext, useEffect } from 'react';
import { NotificationContext } from '../../../contexts/notificationContext';
import useToggle from '../../../hooks/useToggleState';

const EditInfoForm = () => {
    const [editMode, toggleEditMode] = useToggle(false)
    const { openNotification } = useContext(NotificationContext)
    const user = useContext(UserContext)
    const onFinish = (values) => {
        let address = {
            country: values.address.countryProvince[0],
            province: values.address.countryProvince[1],
            street: values.address.street,
            details: values.address.details
        }

        console.log(address)
        toggleEditMode()
        openNotification('success', 'Address saved successfully')
    }

    const [selectAddressForm] = Form.useForm();

    useEffect(() => {
        selectAddressForm.setFieldsValue({
            address: {
                street: user.address.street,
                details: user.address.details,
                countryProvince: [user.address.country, user.address.province]
            }
        })
    }, [])
    return (
        editMode ? <Form
            className='edit-address-form'
            form={selectAddressForm}
            onFinish={onFinish}
            autoComplete="off"
        >
            <h1 style={{ marginBottom: '5vh' }}>you can edit or just save your current delivery Address</h1>
            <Form.Item>
                <Input.Group>
                    <Form.Item
                        name={['address', 'countryProvince']}
                        rules={[
                            { type: 'array', required: true, message: 'Please select your Country / Province' },
                        ]}
                    >
                        <Cascader options={residences} placeholder="Country / Province" size="large" />
                    </Form.Item>
                    <Form.Item
                        name={['address', 'street']}
                        rules={[{ required: true, message: 'Street is required' }]}
                    >
                        <Input placeholder="street" size="large" />
                    </Form.Item>
                    <Form.Item
                        name={['address', 'details']}
                        rules={[{ required: true, message: 'Address Details is required' }]}
                    >
                        <Input placeholder="More Details" size="large" />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <div className='address-content-actions-container'>
                <Button className='address-content-edit-button' htmlType="submit">
                    Deliver to this Address
                </Button>
            </div>
        </Form> :<>
            <div className='address-content'>
                <h1>Your Current Address</h1>
                <div>
                    <h2 style={{display:'inline'}}>Country </h2>
                    <Divider type="vertical"/>
                    <h3 style={{display:'inline'}}>{user.address.country}</h3> 
                </div>
                <Divider />
                <div>
                    <h2 style={{display:'inline'}}>Province </h2>
                    <Divider type="vertical"/>
                    <h3 style={{display:'inline'}}>{user.address.province}</h3> 
                </div>
                <Divider />
                <div>
                    <h2 style={{display:'inline'}}>Street </h2>
                    <Divider type="vertical"/>
                    <h3 style={{display:'inline'}}>{user.address.street}</h3> 
                </div>
                <Divider />
                <div>
                    <h2>more Details :</h2>
                    <div className='address-content-details'>{user.address.details}</div> 
                </div>
                <div className='address-content-actions-container'>
                    <Button className='address-content-edit-button' onClick={toggleEditMode}>
                        Edit
                    </Button>
                </div>
            </div>
        </>
            
    )
}

export default EditInfoForm