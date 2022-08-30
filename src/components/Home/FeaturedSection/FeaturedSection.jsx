import './FeaturedSection.css'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../../../contexts/notificationContext'
import ProductPrice from '../../../shared/ProductPrice'
import {Badge} from 'antd'

const FeaturedSection = ()=> {
    const [products, setProducts] = useState([])
    const [featuredDisplayTitle, setFeaturedDisplayTitle] = useState('')
    const { openNotification } = useContext(NotificationContext)
    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/product/mainList/featured')
            .then(res=> {
                setProducts(res.data.products)
            }).catch(()=> {
                openNotification('error', 'Server Error')
            })
    }, [])

    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/mainList/displayedTitle/featured')
            .then(res=> {
                setFeaturedDisplayTitle(res.data.title)
            }).catch(()=> {
                openNotification('error', 'Server Error')
            })
    }, [])

    return (
        <div className="featured-section-container">
            <h1 className="featured-section-heading">{featuredDisplayTitle}</h1>
            <div className="featured-products-container">
                {products.map(product=>(
                    <Link key={product._id} to={`/${product.category.name}/${product.subCategory.name}/${product.model.name}/${product.name}/${product._id}`}>
                        {product.discountPercentage > 0 ?
                            <Badge.Ribbon text="SALE" color="red">
                                <div className="featured-product-card">
                                    <img className='product-image' src={product.photos[0].src}/>
                                    <ProductPrice product={product}/>
                                </div>
                            </Badge.Ribbon>:
                            <div className="featured-product-card">
                                <img className='product-image' src={product.photos[0].src}/>
                                <ProductPrice product={product}/>
                            </div>
                        }
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FeaturedSection