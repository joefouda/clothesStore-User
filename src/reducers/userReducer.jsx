const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.user
        case 'CLEAR':
            return {};
        default:
            return state
    }
}

export default reducer
