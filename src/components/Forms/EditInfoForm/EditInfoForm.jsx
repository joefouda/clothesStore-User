import './EditInfoForm.css'
import axios from 'axios'
import { Form, Input, Button, Cascader, Divider } from 'antd'
import residences from "../../../shared/residences"
import { NotificationContext } from '../../../contexts/notificationContext';
import { UserContext } from '../../../contexts/userContext';
import { DispatchUserContext } from '../../../contexts/userContext';
import { useContext, useEffect } from 'react';

const EditInfoForm = (props) => {
    const user = useContext(UserContext)
    const dispatchUser = useContext(DispatchUserContext)
    const { openNotification } = useContext(NotificationContext)
    const onFinish = (values) => {
        let address = {
            country:values.address.countryProvince[0],
            province:values.address.countryProvince[1],
            street:values.address.street,
            details:values.address.details
        }
        let data = {
            ...values,
            phone: `+20${values.phone}`,
            address
        }
        axios.put('http://localhost:3000/api/v1/user/update', data,{
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        }).then(res=>{
            dispatchUser({type:'SET', user:res.data.user})
            props.toggleEditMode()
            openNotification('success', "your information updated successfully")
        })
    }

    const handleCancel = ()=>{
        profileInfoForm.resetFields()
        props.toggleEditMode()
    }
    const [profileInfoForm] = Form.useForm();

    useEffect(()=>{
        profileInfoForm.setFieldsValue({
            name:user.name,
            email:user.email,
            phone:user.phone.slice(3),
            address: {
                street:user.address.street,
                details:user.address.details,
                countryProvince:[user.address.country, user.address.province]
            }
        })
    }, [])
    return (
            <Form
                className='editform'
                form={profileInfoForm}
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 23 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Input placeholder="Name" size="large" allowClear />
                </Form.Item>
                <Divider />
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'email',
                        }
                    ]}
                >
                    <Input placeholder="Email" size="large" allowClear />
                </Form.Item>
                <Divider />
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Must be only numbers'
                        },
                        {
                            len: 10,
                            message: 'Must be exactly 10 numbers'
                        }
                    ]}
                >
                    <Input placeholder="Phone" size="large" addonBefore="+20" />
                </Form.Item>
                <Divider />
                <Form.Item label="Address">
                    <Input.Group compact>
                        <Form.Item
                            style={{ width: '20%' }}
                            name={['address', 'countryProvince']}
                            rules={[
                                { type: 'array', required: true, message: 'Please select your Country / Province' },
                            ]}
                        >
                            <Cascader options={residences} placeholder="Country / Province" size="large" />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '30%' }}
                            name={['address', 'street']}
                            rules={[{ required: true, message: 'Street is required' }]}
                        > 
                            <Input placeholder="street" size="large" />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '50%' }}
                            name={['address', 'details']}
                            rules={[{ required: true, message: 'Address Details is required' }]}
                        >
                            <Input placeholder="More Details" size="large" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <div className='editform-actions'>
                    <Button className="editform-cancel-button" type="primary" size='large' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="editform-save-button" type="primary" htmlType="submit" size='large'>
                        Save Changes
                    </Button>
                </div>
            </Form>
    )
}

export default EditInfoForm