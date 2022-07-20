import authentication from "../auth/authentication";
import axios from 'axios'

const reducer =  (state, action) => {
     switch (action.type) {
        case 'ADD':
            if (authentication.isAuthinticated()){
                axios.put('http://localhost:3000/api/v1/user', {productId:action.product._id},{
                    headers:{
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res=>{
                    return res.data.user.favorites
                })
            }
            return [...state, {...action.product}]
        case 'REMOVE':
            if (authentication.isAuthinticated()){
                axios.put('http://localhost:3000/api/v1/user/remove', {productId:action.id},{
                    headers:{
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res=>{
                    return res.data.user.favorites
                })
            }
            return state.filter(product => product._id !== action.id);
        case 'MERGE':
            return action.favorites;
        case 'CLEAR':
            return [];
        default:
            return state
    }
}

export default reducer