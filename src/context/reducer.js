export const actionType = {
    SET_USER: 'SET_USER',
    SET_MARKET_ITEMS: 'SET_MARKET_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_POPUP_SHOW: 'SET_POPUP_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_SECTION_DATA: 'SET_SECTION_DATA',
}

const reducer = (state, action) => {
    switch(action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        
        case actionType.SET_MARKET_ITEMS:
            return {
                ...state,
                marketItems: action.marketItems,
            }

        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow,
            }

        case actionType.SET_POPUP_SHOW:
            return {
                ...state,
                popupShow: action.popupShow,
            }

        case actionType.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            }

        case actionType.SET_SECTION_DATA:
            return {
                ...state,
                sectionData: action.sectionData,
            }

        default: 
            return state;
    }
}

export default reducer