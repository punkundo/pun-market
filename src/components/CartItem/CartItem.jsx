import React, { useEffect, useState } from 'react'
import {BiMinus, BiPlus} from 'react-icons/bi'
import { motion } from "framer-motion"
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
let items = JSON.parse(localStorage.getItem("cartItems")) 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : []

const CartItem = ({ item, setFlag, flag }) => {
    
  const [{ cartItems, total }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (item.qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [items]);
  return (
    <div
      className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-3"
    >
      <img 
        src={item?.imageURL} 
        alt=""
        className="w-20 h-20 max-w-[60px] object-contain"
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p
          className="text-base text-gray-50 product-title"
          title={item.title}
        >{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          {parseInt(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
          <span className="text-sm underline">đ</span>
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div 
            whileTap={{ scale: 0.75 }}
            onClick={()=> updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center"
        >
          {item.qty}
        </p>
        <motion.div 
            whileTap={{ scale: 0.75}}
            onClick={()=> updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50"/>
        </motion.div>
      </div>
    </div>
  )
}

export default CartItem