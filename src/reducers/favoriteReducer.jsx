const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {...action.product}]
        case 'REMOVE':
            return state.filter(product => product._id !== action.id);
        default:
            return state
    }
}

export default reducer