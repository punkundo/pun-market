import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useStateValue } from '../../context/StateProvider'
import RowContainer from '../RowContainer/RowContainer'
import { useEffect, useState } from 'react'
import { actionType } from '../../context/reducer'
import CartContainer from '../CartContainer/CartContainer'

const DetailItem = () => {

  const { id } = useParams()
  const [{marketItems, cartItems, cartShow}, dispatch] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartItems")) 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : []
  )

  const addButton = (item) => {
    let checkItem = cartItems.findIndex(n => n.id === item.id)
    
    console.log(checkItem);
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
    addToCart()
  }, [items])

  useEffect(() => {}, [scrollValue, id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  let item = marketItems.find(item => item.id === id)

  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center mt-20">
      <div className="grid gird-cols-1 xl:grid-cols-2 gap-2  w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 mb-10">
        <div className="mr-10 flex items-center justify-content">
          <img 
            src={item?.imageURL} 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-auto h-auto py-10 flex flex-col gap-1 md:gap-5">
          <p className="text-2xl uppercase">{item.title}</p>
          <p className="text-3xl text-headingColor font-semibold py-10">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="text-xl text-red-500 underline">đ</span> 
          </p>
          <button className="text-textBtnBuy bg-btnBuy rounded-md outline-none leading-6 min-w-[190px] max-w-[300px]
            flex items-center justify-center py-2 hover:opacity-80"
            onClick={() => addButton(item)}
          >
            Chọn mua
          </button>
          <div className=" bg-cardOverlay h-auto p-4 mt-10">
            <p className="text-xl mb-5 font-medium">Mô Tả Sản Phẩm</p>
            <p className='ml-4 text-justify'>{item.description}</p>
          </div>
          
        </div>
      </div>
      
      <section className="w-[90%] my-6">
        <div className="w-full flex items-center justify-between relative">
          <p className="text-2xl font-semibold uppercase text-headingColor relative
            before:absolute before:rounded-lg before:content before:w-32
            before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr 
            from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
          >
            SẢN PHẨM TUƠNG TỰ
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div 
              whileTap={ {scale : 0.75} }
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer
              transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-base text-white"/>
            </motion.div>
            <motion.div 
              whileTap={ {scale : 0.75} }
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer
              transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-base text-white"/>
            </motion.div>
          </div>
        </div>
        
        <RowContainer 
          scrollValue={scrollValue}
          flag={true} 
          data={marketItems?.filter(n => n.id !== item.id && n.category === item.category)} 
        />
      </section>
      {cartShow && <CartContainer />}
    </div>
  )
}

export default DetailItem