import React, { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import {categories} from '../../utils/data'
import { motion } from 'framer-motion'
import RowContainer from '../RowContainer/RowContainer'
import { useStateValue } from "../../context/StateProvider"



const MenuContainer = () => {

  const [filter, setFilter] = useState("short")
  const [{marketItems, dispatch}] = useStateValue()

  return (
    <section id="menu" className="w-full my-6 flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold uppercase text-headingColor relative
        before:absolute before:rounded-lg before:content before:w-32 mr-auto
        before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr 
        from-orange-400 to-orange-600"
        >
          SẢN PHẨM CỦA CHÚNG TÔI
        </p>
          
        <div className="w-full flex items-center justify-center gap-8 my-6
        overflow-x-scroll scrollbar-none">
          {categories && categories.map(category => (
            <motion.div 
              whileTap={{ scale: 0.5 }}
              key={category.id}
              className={`${
                filter === category.urlParamName 
                  ? 'bg-cartNumBg' 
                  : 'bg-card'
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex
                flex-col gap-3 items-center hover:bg-cartNumBg justify-center 
                duration-150 transition-all ease-in-out`}
              onClick={() => setFilter(category.urlParamName)}
            >
              <div className={`w-10 h-10 rounded-full ${
                filter === category.urlParamName 
                  ? 'bg-white'
                  : 'bg-cartNumBg'
                } bg-cartNumBg group-hover:bg-card flex items-center justify-center`}>
                  <IoFastFood className={`${
                      filter === category.urlParamName 
                        ? 'text-textColor'
                        : 'text-white'
                      } group-hover:text-card text-lg`} />
              </div>
              <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor'} group-hover:text-white`}>{category.name}</p>
          </motion.div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center">
          <RowContainer 
            flag={false} 
            data={marketItems?.filter(n => n.category === filter)}
          />
        </div>
      </div>
    </section>
  )
}

export default MenuContainer