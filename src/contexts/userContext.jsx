import { createContext, useReducer } from "react"
import userReducer from '../reducers/userReducer'

export const UserContext = createContext()
export const DispatchUserContext = createContext()

const UserProvider = (props) => {
    const [user, dispatchUser] = useReducer(userReducer, {})
    return (
        <UserContext.Provider value={user}>
            <DispatchUserContext.Provider value={dispatchUser}>{props.children}</DispatchUserContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider