const sessionReducer = (state = {loggedIn: false, token: null, user: null}, payload) => {
    switch (payload.type) {
        case 'UPDATE_SESSION':
            return {...state, ...payload.payload}
        default:
            return state
    }
}

export default sessionReducer
