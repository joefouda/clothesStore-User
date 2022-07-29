import { List } from 'antd';
import {Link} from 'react-router-dom'
import './CategoryHoverContent.css'

const CategoryHoverContent = (props) => {
    return (
        <div className='Hover-container'>
            <div className='Hover-content'>
                <List
                    size="small"
                    header={<h3><Link to={`/filter/${props.category.name}`}>{props.category.name}</Link></h3>}
                    dataSource={props.category.subCategories}
                    renderItem={item => <List.Item><Link to={`/filter/${props.category.name}/${item.name}`}>{item.name}</Link></List.Item>}
                />
                <img src={props.category.photo} className="Hover-img"/>
            </div>
        </div>
    )
}

export default CategoryHoverContent