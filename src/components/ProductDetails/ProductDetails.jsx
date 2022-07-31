import './ProductDetails.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import MainWrapper from "../../shared/main-wrapper";
import ImageSwiper from './ImageSwiper/ImageSwiper';
import authentication from '../../auth/authentication';
import { Select, Button, Form, InputNumber, Image, Tag } from 'antd';
import { PlusOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CartContext } from '../../contexts/cartContext';
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
    const cart = useContext(CartContext)
    const dispatch = useContext(DispatchContext)
    const dispatchFavorite = useContext(DispatchFavoriteContext)
    const favorites = useContext(FavoriteContext)
    const { openNotification } = useContext(NotificationContext)
    
    const [product, setProduct] = useState({})
    const [photos, setPhotos] = useState([])
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
                setPhotos(res.data.product.photos)
                console.log(res.data.product)
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
                    <ImageSwiper photos={photos}/>
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
                            <Button type="primary" className="cart-button" icon={<PlusOutlined />} disabled={product.stock=== 0 || cart.some(orderItem=>orderItem.product._id === product._id)? true:false} onClick={handleAddToCart}>
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