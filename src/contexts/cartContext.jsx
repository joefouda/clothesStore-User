import { createContext } from "react"
import cartReducer from '../reducers/cartReducer'
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';

export const CartContext = createContext()
export const DispatchContext = createContext()

const CartProvider = (props) => {
    const [cart, dispatch] = useLocalStorageReducer('cart', [], cartReducer)
    return (
        <CartContext.Provider value={cart}>
            <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
        </CartContext.Provider>
    )
}

export default CartProvider