import './UserControl.css'
import { Form, Input, Button } from 'antd'


const UserControl = () => {
    const onFinish = (values) => {
        console.log(values)
    }
    const [loginForm] = Form.useForm();
    return (
        <>
            <h2>Log In</h2>
            <p style={{marginBottom:'5vh'}}>Log in to quickly navigate to the page you’re looking for.</p>
            <Form
                form={loginForm}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
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
                <Form.Item >
                    <Button className='login-button' type="primary" htmlType="submit" size='large'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default UserControl