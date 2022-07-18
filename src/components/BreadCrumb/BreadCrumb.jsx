import { Breadcrumb } from 'antd';
import './BreadCrumb.css'

const BreadCrumb = (props)=>{
    return (
        <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{props.category}</Breadcrumb.Item>
            <Breadcrumb.Item>{props.subCategory}</Breadcrumb.Item>
            <Breadcrumb.Item>{props.product}</Breadcrumb.Item>
            <Breadcrumb.Item>{props.model}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BreadCrumb