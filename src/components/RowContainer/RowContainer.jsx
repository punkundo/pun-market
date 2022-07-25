import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import { Link } from 'react-router-dom'

const RowContainer = ({ flag, data, scrollValue }) => {

  const rowContainer = useRef()
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartItems")) 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : []
  )
  const [{ cartItems }, dispatch] = useStateValue()

  const addButton = (e, item) => {
    e.preventDefault(); 
    e.stopPropagation();
    let checkItem = cartItems.findIndex(n => n.id === item.id)
    if ( checkItem < 0 ) {
      setItems([...cartItems, item])
    } else{
      cartItems[checkItem].qty += 1
      setItems([...cartItems])
    }
  }

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items
    })

    localStorage.setItem("cartItems", JSON.stringify(items))
  }

  useEffect(()=> {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])

  useEffect(()=> {
    addToCart()
  }, [items])

  return (
    <div 
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 bg-cardOverlay scroll-smooth ${
        flag 
            ? 'overflow-x-scroll scrollbar-none' 
            : 'overflow-x-hidden flex-wrap justify-center h-auto'
      }`}
    >
      {data && data.length > 0
      ? data.map(item => (
        <Link to={`/item/${item.id}`}
          key={item?.id} 
          className="w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-[250px] bg-cardOverlay
            rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-xl my-12 flex flex-col items-center 
            justify-evenly relative"
            onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex items-center justify-between my-6">
            <motion.div
              whileHover={ {scale: 1.2} }
              className="w-40 h-40 ml-6 -mt-8 drop-shadow-2xl"
            >
              <img 
                src={item?.imageURL} 
                alt="" 
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>
    
            <motion.div 
                whileTap={ {scale: 0.75} }
                className="w-8 h-8 rounded-full bg-red-600 flex items-center
                justify-center cursor-pointer hover:shadow-md z-50"
                onClick={(e) => addButton(e, item)}
            >
                <MdShoppingBasket className="text-white" />
            </motion.div>
        </div>
        <div className=" w-full flex flex-col gap-1 items-center justify-center">
            <p 
              className="product-title text-textColor font-semibold text-base md:text-lg"
              title={item.title}
            >
                {item.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
            <div className="flex items-center gap-6">
                <p className="text-lg text-headingColor font-semibold">
                {item?.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="text-sm text-red-500 underline">đ</span> 
                </p>
            </div>
            </div>
        </Link>
        )) 
      :<div className="ww-full flex flex-col items-center justify-center">
        <img src={NotFound} alt="" className="h-340"/>
        <p className="text-xl text-headingColor font-semibold my-2">Item Not Available</p>
      </div>}
    </div>
  )
}

export default RowContainer