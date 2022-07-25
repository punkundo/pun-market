export const actionType = {
    SET_USER: 'SET_USER',
    SET_MARKET_ITEMS: 'SET_MARKET_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
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

        case actionType.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            }
        case actionType.SET_TOTAL:
            return {
                ...state,
                total: state.cartItems.map((item) => item.price),
            };

        default: 
            return state;
    }
}

export default reducer