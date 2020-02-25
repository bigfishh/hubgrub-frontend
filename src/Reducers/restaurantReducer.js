const initialState = {
    all: []
}

const restaurantReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case "INITIALIZE_RESTAURANTS":
            return {...state, all: payload}
        default:
            return state;

    }
}

export default restaurantReducer