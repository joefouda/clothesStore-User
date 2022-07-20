import './Login.css'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd'
import authentication from '../../auth/authentication';
import { NotificationContext } from '../../contexts/notificationContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext';
import { FavoriteContext } from '../../contexts/favoriteContext';
import { CartContext } from '../../contexts/cartContext';
import { DispatchContext } from '../../contexts/cartContext';
import { useContext } from 'react';
import axios from 'axios';

const Login = (props)=>{
    const { openNotification } = useContext(NotificationContext)
    const favorites = useContext(FavoriteContext)
    const dispatchFavorites = useContext(DispatchFavoriteContext)
    const cart = useContext(CartContext)
    const dispatchCart = useContext(DispatchContext)
    const navigate = useNavigate()
    const onFinish = (values) => {
        authentication.logIn(values).then((res) => {
            if (res.data.status === 422) {
                openNotification('error', "Invalid Username or Password")
            } else {
                localStorage.setItem('token', res.data.token)

                // sync user favorites from localstorage with backend user favorites on login
                favorites.length !== 0? favorites.map(item=>{
                    axios.put('http://localhost:3000/api/v1/user', {productId:item._id},{
                        headers:{
                            'Authorization': localStorage.getItem('token')
                        }
                    }).then(res=>{
                        dispatchFavorites({type:'MERGE', favorites:res.data.user.favorites})
                    })
                }):axios.get('http://localhost:3000/api/v1/user/favorites',{
                    headers:{
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res=>{
                    dispatchFavorites({type:'MERGE', favorites:res.data.favorites})
                })

                // sync user cart from localstorage with backend user cart on login
                cart.length !== 0? cart.map(item=>{
                    axios.post('http://localhost:3000/api/v1/cart/add', {...item},{
                        headers:{
                            'Authorization': localStorage.getItem('token')
                        }
                    }).then(res=>{
                        dispatchCart({type:'MERGE', cart:res.data.cart})
                    })
                }):axios.get('http://localhost:3000/api/v1/cart/items',{
                    headers:{
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res=>{
                    dispatchCart({type:'MERGE', cart:res.data.cart})
                })

                if(props.ToggleUserControlVisable) props.ToggleUserControlVisable()
                navigate('/profile')
            }
        }).catch(error => {
            openNotification('error', error.message)
        })
    }
    const [loginForm] = Form.useForm();
    return (
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
                    <Button className='login-button' type="primary" htmlType="submit" size='large'>
                        Login
                    </Button>
                    <p>don't have account ? <Button className='login-signup-button' type="link" onClick={()=> navigate('/signup')}>Sign up</Button></p>
                </Form.Item>
            </Form>
    )
}

export default Login