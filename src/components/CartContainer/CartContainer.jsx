import React, { useEffect, useState } from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import { motion } from 'framer-motion'
import {RiRefreshFill} from 'react-icons/ri'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import EmptyCart from "../img/emptyCart.svg"
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.config'

const CartContainer = () => {

  const [{ cartShow, cartItems, user }, dispatch] = useStateValue()
  const [tot, setTot] = useState(0)
  const [flag, setFlag] = useState(1)

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const login = async () => {
    if (!user) {
      const {user:{refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } 
  }

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price
    }, 0)
    setTot(totalPrice)
    console.log(tot)
  }, [tot, flag, cartItems])

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: []
    })

    localStorage.setItem("cartItems", JSON.stringify([]))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 300}}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: 300}}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md 
      flex flex-col z-[1001]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={showCart}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl"/>
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p 
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 bg-gray-100 rounded-md
          hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />{" "}
        </motion.p>
      </div>

      {/* bottom section  */}
      {
        cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
        <div className="w-full h-[450px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll
        scrollbar-none">
        {/*  cart Item section */}
          {
            cartItems && cartItems.map(item => (
                <CartItem  
                key={item.id} 
                item={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))
          }
        </div>
        {/* cart Total section */}
        <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center
        justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Thành tiền</p>
            <p className="text-gray-400 text-lg">
              {tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
              <span className="text-sm underline">đ</span>
            </p>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Phí vận chuyển</p>
            <p className="text-gray-400 text-lg">
              12,000{` `}
              <span className="text-sm underline">đ</span>
            </p>
          </div>

          <div className="w-full border-b border-gray-600">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-xl font-semibold">Tổng tiền</p>
              <p className="text-gray-400 text-xl font-semibold">
                {(tot+12000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
                <span className="text-sm underline">đ</span>
              </p>
            </div>
          </div>

          {user ? (
            <Link to="/payment">
              <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500
              text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              Thanh toán
            </motion.button>
            </Link>
          ) : (
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500
              text-gray-50 text-lg my-2 hover:shadow-lg"
              onClick={login}
            >
              Đăng nhập để thanh toán
            </motion.button>
          )}
        </div>
      </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src={EmptyCart} className="w-300" alt=""></img>
            <p className="text-xl text-textColor font-semibold">
              Add some items to your cart
            </p>
          </div>
        )}

    </motion.div>
  )
}

export default CartContainer