export const initializeRestaurants = (restaurants) => {
    return {
        type: "INITIALIZE_RESTAURANTS",
        payload: restaurants
    }
}

export const fetchAllCategories = (categories) => {
    return {
        type: "FETCH_CATEGORIES",
        payload: categories
    }
}


export const searchRestaurants = (restaurants) => {
    return {
        type: "SEARCH_RESTAURANTS",
        payload: restaurants
    }
}

export const searchMenuItems = (menuItems) => {
    return {
        type: "SEARCH_MENU_ITEMS",
        payload: menuItems
    }
}

