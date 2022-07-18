import { createContext } from "react"
import favoriteReducer from '../reducers/favoriteReducer'
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';

export const FavoriteContext = createContext()
export const DispatchFavoriteContext = createContext()

const FavoriteProvider = (props) => {
    const [favorites, dispatch] = useLocalStorageReducer('favorites', [], favoriteReducer)
    return (
        <FavoriteContext.Provider value={favorites}>
            <DispatchFavoriteContext.Provider value={dispatch}>{props.children}</DispatchFavoriteContext.Provider>
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider