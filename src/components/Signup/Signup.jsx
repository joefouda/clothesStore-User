import './Signup.css'
import MainWrapper from "../../shared/main-wrapper"
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Cascader, Divider, Spin } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import authentication from '../../auth/authentication';
import residences from "../../shared/residences"
import { NotificationContext } from "../../contexts/notificationContext"
import { useContext } from 'react';
import useToggle from '../../hooks/useToggleState'
import FormWrapper from '../../shared/form.wrapper/form.wrapper';

const Signup = () => {
    const [progress, toggleProgress] = useToggle(false)
    const navigate = useNavigate()
    const { openNotification } = useContext(NotificationContext)
    const onFinish = (values) => {
        toggleProgress()
        let address = {
            country: values.address.countryProvince[0],
            province: values.address.countryProvince[1],
            street: values.address.street,
            details: values.address.details
        }
        let data = {
            ...values,
            phone: `+20${values.phone}`,
            address
        }
        authentication.Signup(data).then(res => {
            if (!res.data.message.includes('duplicate key error')) {
                navigate('/login')
                toggleProgress()
            } else {
                openNotification('error', 'Email Exists')
                toggleProgress()
            }
        }).catch(error => {
            openNotification('error', error.message)
        })
    }
    const [signupForm] = Form.useForm();
    return (
        <MainWrapper>
            <FormWrapper>
                <Form
                    className='signup-form'
                    form={signupForm}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h1>Create your Account</h1>
                    <p>Create your Account to optain website full features</p>
                    <Divider />
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <Input placeholder="Name" size="large" allowClear />
                    </Form.Item>
                    <Form.Item
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
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                min: 8
                            }
                        ]}
                    >
                        <Input.Password placeholder="Password" size="large" allowClear />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" size="large" />
                    </Form.Item>
                    <Form.Item
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
                    <Form.Item>
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
                    <Form.Item >
                        <Button icon={<FormOutlined />} className="signup-signup-button" type="primary" htmlType="submit" size='large' loading={progress?true:false}>
                            Signup
                        </Button>
                        <p>already have an account ? <Button className="signup-login-button" type="link" onClick={() => navigate('/login')}>Login</Button></p>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </MainWrapper>
    )
}

export default Signup