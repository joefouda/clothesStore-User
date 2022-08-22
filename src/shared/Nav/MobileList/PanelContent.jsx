import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const PanelContent = (props) => { 
    const [subCategories, setSubCategories] = useState([])
    useEffect(()=> {
        axios.get(`http://localhost:3000/api/v1/subCategory/category/${props.category._id}`).then(res=>{
            setSubCategories(res.data.subCategories)
        })
    }, [])
    return (
        subCategories.map(subCategory => (<Link key={subCategory._id} to={`/filter/${props.category.name}/${subCategory.name}`} onClick={props.toggleMobileListVisable}>{subCategory.name}</Link>))
    )
}

export default PanelContent