import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import MainWrapper from '../../shared/main-wrapper';
import './Filter.css'
import useToggle from '../../hooks/useToggleState'
import { NotificationContext } from '../../contexts/notificationContext';

const Filter = () => {
    const { openNotification } = useContext(NotificationContext)
    const [progress, toggleProgress] = useToggle(false)
    const levels = useParams()
    const [products, setProducts] = useState([])
    const antIcon = <LoadingOutlined style={{ fontSize: 40, color:'black' }} />
    useEffect(() => {
        toggleProgress()
        levels.subCategory ? axios.get(`http://localhost:3000/api/v1/product/subCategory/${levels.subCategory}`).then((res) => {
            setProducts(res.data.products)
            toggleProgress()
        }).catch(error=>{
            openNotification('error', 'Server Error')
        }) : axios.get(`http://localhost:3000/api/v1/product/category/${levels.category}`).then((res) => {
            setProducts(res.data.products)
            toggleProgress()
        }).catch(error=>{
            openNotification('error', 'Server Error')
        })
    }, [levels.category, levels.subCategory])
    return (
        <>
            <MainWrapper>
                <BreadCrumb {...levels} />
                {progress ? <Spin indicator={antIcon} size='large' className='progress'/> :
                    <>
                        {products.length ? <div className='Filter-Products'>
                            {products.map(product => <ProductCard key={product._id} product={product} />)}
                        </div>
                            : <Empty />}
                    </>
                }
            </MainWrapper>
        </>
    )
}

export default Filter