import './ProductDetails.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import MainWrapper from "../../shared/main-wrapper";
import authentication from '../../auth/authentication';
import { Select, Button, Form, InputNumber, Image, Tag } from 'antd';
import { PlusOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { DispatchContext } from '../../contexts/cartContext';
import { CartVisableContext } from '../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext'
import { FavoriteContext } from '../../contexts/favoriteContext';
import { NotificationContext } from '../../contexts/notificationContext';
import { useContext } from 'react';

const tempProduct = {
    _id:1,
    name:'Not Available',
    stock:0,
    price:0,
    photo:'',
    specs:[]
}


const ProductDetails = () => {
    const location = useLocation()
    const [variantsForm] = Form.useForm();
    const {toggleCartVisable} = useContext(CartVisableContext)
    const dispatch = useContext(DispatchContext)
    const dispatchFavorite = useContext(DispatchFavoriteContext)
    const favorites = useContext(FavoriteContext)
    const { openNotification } = useContext(NotificationContext)
    
    const [product, setProduct] = useState({})
    const [specs, setSpecs] = useState([])
    const [query, setQuery] = useState([])
    const levels = useParams()
    const navigate = useNavigate()

    const handleChange = (name, value) => {
        let old = query.findIndex(ele=>ele.name === name)
        let newQuery = [...query]
        newQuery[old].value = value

        axios.put(`http://localhost:3000/api/v1/product/specs`, {model:levels.model,specs:newQuery}).then((res) => {
            if(res.data.message === 'notfound'){
                navigate(`/${levels.category}/${levels.subCategory}/${levels.model}/${tempProduct.name}/${tempProduct._id}`)
            } else {
                setQuery(res.data.product.specs)
                setProduct(res.data.product)
                navigate(`/${levels.category}/${levels.subCategory}/${levels.model}/${res.data.product.name}/${res.data.product._id}`)
            }
        })
    };

    const handleAddToCart = ()=>{
        let orderItem = {
            product,
            quantity:variantsForm.getFieldValue('quantity'),
            orderPrice:variantsForm.getFieldValue('quantity') * product.price
        }
        dispatch({type:'ADD', orderItem})
        if (authentication.isAuthinticated()){
            axios.post('http://localhost:3000/api/v1/cart/add', {...orderItem},{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res=>{
                dispatch({type:'MERGE', cart:res.data.cart})
                openNotification('success', res.data.message)
                toggleCartVisable()
            }).catch(error=>{
                console.log(error)
            })
        }else {
            openNotification('success', 'added to cart successfully')
            toggleCartVisable()
        }

    }

    const handleAddToFavorites = ()=>{
        dispatchFavorite({type:'ADD', product})
        openNotification('success', 'added to favorites successfully')
    }

    const handleRemoveFromFavorites = ()=>{
        dispatchFavorite({type:'REMOVE', id:product._id})
        openNotification('success', 'removed from favorites successfully')
    }
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/product/${levels.id}`).then((res) => {
            if(res.data.message === 'internal server error') {
                setProduct({...tempProduct})
            } else {
                setQuery(res.data.product.specs)
                setProduct(res.data.product)
                axios.get(`http://localhost:3000/api/v1/subCategory/${res.data.product.subCategory._id}`).then((res) => {
                    setSpecs(()=>[...res.data.subCategory.specs])
                })
            }
        })
    }, [location])
    

    return (
        <MainWrapper>
            <div className='product-details-container'>
                <div className='product-details-leftside'>
                    <Image
                        style={{ width: 'auto', height: '70vh' }}
                        src={product.photo}
                        fallback="data:image/png;base64,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"
                    />
                    {!product.stock?<Tag color="red">Not Available</Tag>:product.stock === 1?<Tag color="gold">Only one Item left</Tag>:<Tag color="green">Available in Stock</Tag>}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center', padding: '0 5vw' }}>
                    <BreadCrumb {...levels} />
                    <div style={{flexGrow:1}}>
                        <h1>{product.name}</h1>
                        <h2>LE {product.price}</h2>
                    </div>
                    
                    <Form
                        form={variantsForm}
                        initialValues={{
                            quantity:1
                        }}
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        {specs.map(spec => {
                            let defValue = product.specs.find(ele => ele.name === spec.name)
                            return (<Form.Item key={spec._id} label={spec.name} style={{justifyContent:'center'}}>
                                <Select
                                    size='large'
                                    defaultValue={defValue?.value || ''}
                                    style={{
                                        width: '30vw',
                                    }}
                                    onChange={(value)=>handleChange(spec.name,value)}
                                >
                                    {spec.options.map((op,index) => (<Select.Option key={index} value={op}>{op}</Select.Option>))}
                                </Select>
                            </Form.Item>)
                        })}
                        <Form.Item label="quantity" name='quantity' style={{justifyContent:'center'}}>
                            <InputNumber min={1} max={product.stock} style={{width:'30vw'}} disabled={product.stock === 0?true:false}/>
                        </Form.Item>
                        <Form.Item style={{justifyContent:'center'}}>
                            <Button type="primary" className="cart-button" icon={<PlusOutlined />} disabled={product.stock === 0? true:false} onClick={handleAddToCart}>
                                Add To Cart
                            </Button>
                            {favorites.findIndex(ele=>ele._id === product._id) === -1?<Button size='large' icon={<HeartOutlined />} disabled={product._id === 1 ? true:false} onClick={handleAddToFavorites} />:
                            <Button size='large' icon={<HeartFilled />} disabled={product._id === 1 ? true:false} onClick={handleRemoveFromFavorites}/>}
                        </Form.Item>
                    </Form>
                    <p style={{maxWidth:'30vw', margin: 'auto', textAlign:'center', overflowWrap:'break-word'}}>{product.description}</p>
                </div>
                
            </div>
        </MainWrapper>
    )
}

export default ProductDetails