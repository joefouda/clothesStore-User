import authentication from "../auth/authentication";
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            if(state.length !== 0 && state.some(ele=>ele.product._id === action.orderItem.product._id)) return state
            return [...state, {...action.orderItem}]
        case 'UPDATE':
            return state.map(orderItem =>
                orderItem._id === action.id ? { ...orderItem, quantity: action.quantity } : orderItem
            );
        case 'REMOVE':
            console.log(action.id,action.orderItemId)
            if (authentication.isAuthinticated()){
                axios.delete(`http://localhost:3000/api/v1/cart/remove/${action.orderItemId}`,{
                    headers:{
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(res=>{
                    return res.data.cart
                })
            }
            return state.filter(orderItem => orderItem.product._id !== action.id);
        case 'MERGE':
            return action.cart;
        case 'CLEAR':
            return [];
        case 'PERMENANTCLEAR':
            axios.delete(`http://localhost:3000/api/v1/cart/empty`,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res=>{
                console.log(res)
            })
            return [];
        default:
            return state
    }
}

export default reducer
