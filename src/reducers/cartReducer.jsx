const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {...action.orderItem}]
        case 'UPDATE':
            return state.map(orderItem =>
                orderItem._id === action.id ? { ...orderItem, quantity: action.quantity } : orderItem
            );
        case 'REMOVE':
            return state.filter(orderItem => orderItem.product._id !== action.id);
        default:
            return state
    }
}

export default reducer
