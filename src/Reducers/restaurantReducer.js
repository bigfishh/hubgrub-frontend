const initialState = {
    all: [],
    searchTerm: '',
    categories: []
}

const restaurantReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case "INITIALIZE_RESTAURANTS":
            return {...state, all: payload}
        case "FETCH_CATEGORIES":
            return {...state, categories: payload}            
        case "SEARCH_RESTAURANTS":
            return {...state, searchTerm: payload}
        case "SEARCH_MENU_ITEMS":
            return {...state, searchTerm: payload}
        default:
            return state;

    }
}

export default restaurantReducer