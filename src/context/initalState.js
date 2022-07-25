import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user: userInfo,
    cartShow: false,
    cartItems: cartInfo,
    total: 0,
    marketItems: null,
}