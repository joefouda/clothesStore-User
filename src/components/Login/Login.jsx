import './Login.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import authentication from '../../auth/authentication';
import { NotificationContext } from '../../contexts/notificationContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { FavoriteContext } from '../../contexts/favoriteContext';
import { CartContext } from '../../contexts/cartContext';
import { DispatchContext } from '../../contexts/cartContext';
import { DispatchUserContext } from '../../contexts/userContext';
import { useContext } from 'react';
import useToggle from '../../hooks/useToggleState';
import axios from 'axios';

const Login = (props) => {
    const location = useLocation()
    const { openNotification } = useContext(NotificationContext)
    const [progress, toggleProgress] = useToggle(false)
    const dispatchUser = useContext(DispatchUserContext)
    const favorites = useContext(FavoriteContext)
    const dispatchFavorites = useContext(DispatchFavoriteContext)
    const cart = useContext(CartContext)
    const dispatchCart = useContext(DispatchContext)
    const navigate = useNavigate()
    const onFinish = (values) => {
        toggleProgress()
        authentication.logIn(values).then((res) => {
            if (res.data.status === 422) {
                openNotification('error', "Invalid Username or Password")
                toggleProgress()
            } else if (res.data.message.includes('you have been banned')) {
                openNotification('error', 'you have been banned due to bad behavior')
                toggleProgress()
            }else if (!res.data.token) {
                openNotification('error', 'Server Error')
                toggleProgress()
            } else {
                localStorage.setItem('token', res.data.token)
                dispatchUser({ type: 'SET', user: res.data.user })

                // sync user favorites from localstorage with backend user favorites on login
                favorites.length !== 0 ? favorites.map(item => {
                    axios.put('http://localhost:3000/api/v1/user', { productId: item._id }, {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    }).then(res => {
                        dispatchFavorites({ type: 'MERGE', favorites: res.data.user.favorites })
                    }).catch(error => {
                        openNotification('error', 'Server Error')
                    })
                }) : axios.get('http://localhost:3000/api/v1/user/favorites', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res => {
                    dispatchFavorites({ type: 'MERGE', favorites: res.data.favorites })
                }).catch(error => {
                    openNotification('error', 'Server Error')
                })

                // sync user cart from localstorage with backend user cart on login
                cart.length !== 0 ? cart.map(item => {
                    axios.post('http://localhost:3000/api/v1/cart/add', { ...item }, {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    }).then(res => {
                        dispatchCart({ type: 'MERGE', cart: res.data.cart })
                    }).catch(error => {
                        openNotification('error', 'Server Error')
                    })
                }) : axios.get('http://localhost:3000/api/v1/cart', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res => {
                    dispatchCart({ type: 'MERGE', cart: res.data.cart })
                }).catch(error => {
                    openNotification('error', 'Server Error')
                })

                if (props.ToggleUserControlVisable) props.ToggleUserControlVisable()
                if(location.state?.from){
                    navigate(location.state?.from)
                } else {
                    navigate('/profile')
                }
                toggleProgress()
            }
        }).catch(error => {
            console.log(error)
            openNotification('error', 'Server Error')
        })
    }
    return (
        <Form
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <h2>Log In</h2>
            <p>Log in to quickly navigate to the page you’re looking for.</p>
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
                <Button icon={<LoginOutlined />} className='login-button' type="primary" htmlType="submit" size='large' loading={progress?true:false}>
                    Login
                </Button>
                <p>don't have account ? <Button className='login-signup-button' type="link" onClick={() => navigate('/signup')}>Sign up</Button></p>
            </Form.Item>
        </Form>
    )
}

export default Login