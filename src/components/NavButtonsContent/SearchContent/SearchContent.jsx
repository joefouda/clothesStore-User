import './SearchContent.css'
import { Input } from 'antd';
import ProductCard from '../../ProductCard/ProductCard'
import { useState } from 'react';
import axios from 'axios'
import useToggle from '../../../hooks/useToggleState';
const { Search } = Input;

const SearchContent = ()=> {
    const [searchName, setSearchName] = useState('')
    const [searched, toggleSearched] = useState(false)
    const [loading, toggleLoading] = useToggle(false)
    const [products, setProducts] = useState([])

    const handleChange = (event)=> {
        toggleSearched(false)
        setSearchName(event.target.value)
    }
    
    const handleSearch = ()=> {
        toggleLoading()
        axios.get(`http://localhost:3000/api/v1/product/search/${searchName}`).then(res=>{
            if(res.data.products){
                setProducts(res.data.products)
            }
            toggleLoading()
            toggleSearched(true)
        })
    }
    return (
        <div className="search-container">
            <Search placeholder="input search text" size="large" onSearch={handleSearch} onPressEnter={handleSearch} loading={loading} onChange={handleChange}/>
            {products.length === 0 && searched && <h2 style={{textAlign:'center'}}>No results found for '{searchName}'</h2>}
            <div className="search-results-container">
                {products.map(product=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default SearchContent