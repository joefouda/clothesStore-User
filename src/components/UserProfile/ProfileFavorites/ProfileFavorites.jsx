import './ProfileFavorites.css'
import { useContext } from 'react'
import { Empty } from 'antd'
import ProductCard from '../../ProductCard/ProductCard'
import { FavoriteContext } from '../../../contexts/favoriteContext'

const ProfileFavorites = ()=> {
    const favorites = useContext(FavoriteContext)
    return (
        favorites.length === 0 ? <Empty
            description={
                <span>
                    No Items In you List
                </span>
            }
        >
        </Empty> :
        <div className='favorites-container'>
            {favorites.map(item=>(
                <ProductCard product={item}/>
            ))}
        </div>
    )
}

export default ProfileFavorites