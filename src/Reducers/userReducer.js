const initialState = {
    user: {
        cart: []
    },
    token: ""
}

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case "SAVE_USER_TO_STATE":
            return {...state, user: payload.user, token: payload.token}
        case 'LOGOUT_USER':
            return {...state, user: {}, token: ''}
        case "ADD_ITEM_TO_CART":
            // debugger
            return {...state, user: {...state.user, cart: {...state.user.cart, food_ordered: payload}}}
        case "REMOVE_ITEM_FROM_CART":
            console.log('removed me, reducer')
            return {...state, user: {...state.user, cart: {...state.user.cart, food_ordered: payload}}}
        case "CHECKOUT_CART":
            return {...state, user: payload}
        default:
            return state;

    }
}

export default userReducer