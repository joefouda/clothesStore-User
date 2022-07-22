import { createContext } from "react"
import userReducer from '../reducers/userReducer'
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';

export const UserContext = createContext()
export const DispatchUserContext = createContext()

const UserProvider = (props) => {
    const [user, dispatchUser] = useLocalStorageReducer('user', {}, userReducer)
    return (
        <UserContext.Provider value={user}>
            <DispatchUserContext.Provider value={dispatchUser}>{props.children}</DispatchUserContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider