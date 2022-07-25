import React, { useEffect, useRef, useState } from 'react'
import HomeContainer from '../HomeContainer/HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from '../RowContainer/RowContainer'
import { useStateValue } from "../../context/StateProvider"
import MenuContainer from '../MenuContainer/MenuContainer'
import CartContainer from '../CartContainer/CartContainer'
import SearchContainer from '../SearchContainer/SearchContainer'

const MainContainer = () => {

  const [{ marketItems, cartShow }, dispatch] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {}, [scrollValue, cartShow])

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center overflow-x-hidden">
      <HomeContainer />
      <SearchContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between relative">
          <p className="text-2xl font-semibold uppercase text-headingColor relative
            before:absolute before:rounded-lg before:content before:w-32
            before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr 
            from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
          >
            SẢN PHẨM BÁN CHẠY 🔥
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
          data={marketItems?.filter(n => n.category === 'skirt')}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  )
}

export default MainContainer