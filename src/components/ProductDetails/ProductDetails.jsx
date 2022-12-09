import './ProductDetails.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import MainWrapper from "../../shared/main-wrapper";
import ImageSwiper from './ImageSwiper/ImageSwiper';
import authentication from '../../auth/authentication';
import { Button, InputNumber, Image, Tag, Radio, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { PlusOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CartContext } from '../../contexts/cartContext';
import { DispatchContext } from '../../contexts/cartContext';
import { CartVisableContext } from '../../contexts/cartContext';
import { DispatchFavoriteContext } from '../../contexts/favoriteContext'
import { FavoriteContext } from '../../contexts/favoriteContext';
import { NotificationContext } from '../../contexts/notificationContext';
import { useContext } from 'react';
import useToggle from '../../hooks/useToggleState';
import ProductPrice from '../../shared/ProductPrice';

const antIcon = <LoadingOutlined style={{ fontSize: 40, color: 'black' }} />

const ProductDetails = () => {
    const [progress, toggleProgress] = useToggle(false)
    const location = useLocation()
    const { toggleCartVisable } = useContext(CartVisableContext)
    const cart = useContext(CartContext)
    const dispatch = useContext(DispatchContext)
    const dispatchFavorite = useContext(DispatchFavoriteContext)
    const favorites = useContext(FavoriteContext)
    const { openNotification } = useContext(NotificationContext)
    const [product, setProduct] = useState({})
    const [photos, setPhotos] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [currentStock, setCurrentStock] = useState(0)
    const [currentColors, setCurrentColors] = useState([])
    const [selectedColor, setSelectedColor] = useState({})
    const [selectedSize, setSelectedSize] = useState('')
    const levels = useParams()

    const handleAddToCart = () => {
        toggleProgress()
        let orderItem = {
            product,
            quantity,
            orderPrice: quantity * product.netPrice,
            selectedColor,
            selectedSize
        }
        dispatch({ type: 'ADD', orderItem })
        if (authentication.isAuthinticated()) {
            axios.post('http://localhost:3000/api/v1/cart/add', { ...orderItem }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => {
                dispatch({ type: 'MERGE', cart: res.data.cart })
                openNotification('success', res.data.message)
                toggleProgress()
                toggleCartVisable()
            }).catch(error => {
                openNotification('error', 'Server Error')
            })
        } else {
            openNotification('success', 'added to cart successfully')
            toggleProgress()
            toggleCartVisable()
        }

    }

    const handleAddToFavorites = () => {
        toggleProgress()
        dispatchFavorite({ type: 'ADD', product })
        openNotification('success', 'added to favorites successfully')
        toggleProgress()
    }

    const handleRemoveFromFavorites = () => {
        toggleProgress()
        dispatchFavorite({ type: 'REMOVE', id: product._id })
        openNotification('success', 'removed from favorites successfully')
        toggleProgress()
    }

    const changeColor = (newColor)=> {
        toggleProgress()
        setSelectedColor(newColor)
        setSelectedSize('')
        let colorPhotos = product.colors.find(color=>color.color === newColor.color).photos
        setPhotos(colorPhotos)
        toggleProgress()
    }

    useEffect(() => {
        toggleProgress()
        axios.get(`http://localhost:3000/api/v1/product/${levels.id}`).then((res) => {
            setProduct(res.data.product)
            setPhotos(res.data.product.colors[0].photos)
            setCurrentStock(res.data.product.colors[0].sizes[0].stock)
            setCurrentColors(res.data.product.colors)
            setSelectedColor(res.data.product.colors[0])
            // setSelectedSize(res.data.product.colors[0].sizes[0].size)
            toggleProgress()
        }).catch(error => {
            openNotification('error', 'Server Error')
        })
    }, [location])


    return (
        <MainWrapper>
            {progress ? <Spin indicator={antIcon} size='large' className='progress' /> : <div className='product-details-container'>
                <div className='product-details-leftside'>
                    {photos.length ? <ImageSwiper photos={photos} /> : <Image height='70vh' src="error" fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==" />}
                </div>

                <div className='product-details-rightside'>
                    <BreadCrumb {...levels} />
                    <div className='product-details-rightside-info'>
                        <h1>{product.name}</h1>
                        <ProductPrice product={product} />
                        {!currentStock ? <Tag color="red">Not Available</Tag> : currentStock === 1 ? <Tag color="gold">Only one Item left</Tag> : <Tag color="green">Available in Stock</Tag>}
                    </div>
                    <div className="variants-container">
                        <div className="colors">
                            {currentColors.map(color=><div key={color._id} className={`color variant ${selectedColor?.color === color.color?'selected-variant':''}`} onClick={()=>changeColor(color)} style={{backgroundColor:color.color}}></div>)}
                        </div>
                        
                    </div>
                    <div className="variants-container">
                    <div className="sizes">
                        {selectedColor?.sizes?.map(size=><div key={size._id} className={`size variant ${selectedSize === size.size?'selected-variant':''}`} onClick={()=>setSelectedSize(size.size)}>{size.size}</div>)}
                    </div>
                    </div>

                    <InputNumber min={1} max={currentStock} addonBefore='quantity' value={quantity} disabled={currentStock === 0 ? true : false} onChange={setQuantity} />
                    <div>
                        <Button type="primary" className="cart-button" icon={<PlusOutlined />} disabled={selectedSize === '' || currentStock === 0 || cart.some(orderItem => orderItem.selectedColor.color === selectedColor.color && orderItem.selectedSize === selectedSize && orderItem.product._id === product._id) ? true : false} onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                        {favorites.findIndex(ele => ele._id === product._id) === -1 ? <Button size='large' icon={<HeartOutlined />} disabled={product._id === 1 ? true : false} onClick={handleAddToFavorites} /> :
                            <Button size='large' icon={<HeartFilled />} disabled={product._id === 1 ? true : false} onClick={handleRemoveFromFavorites} />}
                    </div>
                    <span style={{ maxWidth: '30vw', margin: '0 auto', textAlign: 'center', overflowWrap: 'break-word' }}>{product.description}</span>
                </div>

            </div>}
        </MainWrapper>
    )
}

export default ProductDetails