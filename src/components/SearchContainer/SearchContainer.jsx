import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider'

const SearchContainer = () => {

  const [searchItems, setSearchItems] = useState([])
  const [{ marketItems }, dispatch] = useStateValue()
  
  const { id } = useParams()

  const handleFilter = (e) => {
    const keyWord = e.target.value
    const newFilter = marketItems.filter((item) => {
      return item.title.toLowerCase().includes(keyWord.toLowerCase())
    })

    if (keyWord === ""){
      setSearchItems([])
    } else {
      setSearchItems(newFilter)
    }
  }

  return (
    <div className="w-full my-6">
      <div className="w-full flex items-center justify-between relative">
        <p className="my-10 text-2xl font-semibold uppercase text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-32
          before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr 
        from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
        >
          TÌM KIẾM SẢN PHẨM
        </p>   
      </div> 
      <form className="flex items-center">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input 
            type="text" 
            id="simple-search" 
            className="bg-primary border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " 
            placeholder="Search for favorite items" 
            required="" 
            onChange={handleFilter}
          />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-btnBuy hover:opacity-80 rounded-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      {searchItems.length>0 && <div className="w-full h-[300px] bg-primary overflow-x-hidden scroll-smooth p-2 backdrop-bur-lg my-5 
      flex flex-col gap-2 relative">
        {searchItems && searchItems.map((item) => (
          <Link to={`/item/${item.id}`} 
            className="w-full h-[100px] bg-cardOverlay flex hover:drop-shadow-xl cursor:pointer py-3"
            key={item.id}
          >
            <div className="w-20 h-20 ml-6 mr-6 drop-shadow-xl">
              <img className="w-full h-full object-contain overflow-hidden" src={item?.imageURL} alt="" />
            </div>
            <div className="w-full h-auto">
              <p className="product-title text-textColor font-semibold text-base md:text-lg"
                title={item.title}
              >{item.title}</p>
              <p className="mt-2 text-md text-headingColor">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>}
    </div>
  )
}

export default SearchContainer