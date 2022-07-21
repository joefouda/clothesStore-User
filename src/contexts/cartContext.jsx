import { createContext } from "react"
import cartReducer from '../reducers/cartReducer'
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import useToggle from '../hooks/useToggleState'

export const CartContext = createContext()
export const DispatchContext = createContext()
export const CartVisableContext = createContext()

const CartProvider = (props) => {
    const [cart, dispatch] = useLocalStorageReducer('cart', [], cartReducer)
    const [cartVisable, toggleCartVisable] = useToggle()
    return (
        <CartVisableContext.Provider value={{cartVisable, toggleCartVisable}}>
            <CartContext.Provider value={cart}>
                <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
            </CartContext.Provider>
        </CartVisableContext.Provider>
    )
}

export default CartProvider