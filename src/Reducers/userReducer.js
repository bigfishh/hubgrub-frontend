const initialState = {
    user: {},
    token: ""
}

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case "SAVE_USER_TO_STATE":
            return {...state, user: payload.user, token: payload.token}
        case 'LOGOUT_USER':
            return {...state, user: {}, token: ''}
        default:
            return state;

    }
}

export default userReducer