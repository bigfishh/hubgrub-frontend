export const saveUserToState = (userInfo) => {
    return {
        type: "SAVE_USER_TO_STATE",
        payload: userInfo
    
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}

export const addItemToCart = (newCart) => {
    return {
        type: "ADD_ITEM_TO_CART",
        payload: newCart
    
    }
}

export const removeItemFromCart = (updatedCart) => {
    console.log('removed me, action', updatedCart)
    return {
        type: "REMOVE_ITEM_FROM_CART",
        payload: updatedCart
    
    }
}

export const checkoutCart = (updatedUser) => {
    return {
        type: "CHECKOUT_CART",
        payload: updatedUser
    }
}