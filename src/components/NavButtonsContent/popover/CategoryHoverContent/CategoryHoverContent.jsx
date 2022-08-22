import { List } from 'antd';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './CategoryHoverContent.css'
import axios from 'axios'

const CategoryHoverContent = (props) => {
    const [subCategories,setSubCategories] = useState([])
    useEffect(()=> {
        axios.get(`http://localhost:3000/api/v1/subCategory/category/${props.category._id}`).then(res=>{
            setSubCategories(res.data.subCategories)
        })
    }, [])
    return (
        <div className='Hover-container'>
            <div className='Hover-content'>
                <List
                    size="small"
                    header={<h3><Link to={`/filter/${props.category.name}`}>{props.category.name}</Link></h3>}
                    dataSource={subCategories}
                    renderItem={item => <List.Item><Link to={`/filter/${props.category.name}/${item.name}`}>{item.name}</Link></List.Item>}
                />
                <img src={props.category.photo} className="Hover-img"/>
            </div>
        </div>
    )
}

export default CategoryHoverContent