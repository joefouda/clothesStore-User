import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard';
import { Empty } from 'antd';
import MainWrapper from '../../shared/main-wrapper';
import './Filter.css'

const Filter = () => {
    const levels = useParams()
    const [products, setProducts] = useState([])
    useEffect(() => {
        levels.subCategory ? axios.get(`http://localhost:3000/api/v1/product/subCategory/${levels.subCategory}`).then((res) => {
            console.log(res)
            setProducts(res.data.products)
        }) : axios.get(`http://localhost:3000/api/v1/product/category/${levels.category}`).then((res) => {
            setProducts(res.data.products)
        })
    }, [levels.category, levels.subCategory])
    return (
        <>
            <MainWrapper>
                <BreadCrumb {...levels} />
                {products.length ? <div className='Filter-Products'>
                    {products.map(product => <ProductCard key={product._id} product={product} />)}
                </div> : <Empty />}
            </MainWrapper>
        </>
    )
}

export default Filter