import MainWrapper from "../../shared/main-wrapper"
import { FavoriteContext } from "../../contexts/favoriteContext"
import { CartContext } from "../../contexts/cartContext"
import { useContext } from "react"
const UserProfile = () => {
    const cart = useContext(CartContext)
    const favorites = useContext(FavoriteContext)
    console.log(favorites)
    return (
        <MainWrapper>
            <h1>User Profile</h1>
        </MainWrapper>
    )
}

export default UserProfile