import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import Popup from "reactjs-popup"
import PaymentPopup from '../PaymentPopup/PaymentPopup'

const PaymentContainer = () => {
  const initialValues = { 
    email: "", 
    name: "", 
    phone: "", 
    address: "", 
    city: "", 
    town:"", 
    note: ""
  }
  const [formValues, setFormValues] = useState(initialValues)
  const [{cartItems, popupShow }, dispatch] = useStateValue()
  const [tot, setTot] = useState(0)
  const [flag, setFlag] = useState(1)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)  
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  console.log(popupShow)

  const validate = (value) => {
    const errors = {}
    const regex = `[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}`
    if (!value.email){
      errors.email = "*Không đuợc để trống email"
    } else if (!value.email.match(regex)) {
      errors.email = "*Địa chỉ email không hợp lệ"
    }
    if (!value.name){
      errors.name = "*Không đuợc để trống họ tên"
    }
    if (!value.phone){
      errors.phone = "*Không đuợc để trống số điện thoại"
    }
    if (!value.address){
      errors.address = "*Không đuợc để trống địa chỉ"
    }
    if (!value.city){
      errors.city = "*Không đuợc để trống tỉnh thành"
    }
    if (!value.town){
      errors.town = "*Không đuợc để trống quận huyện"
    }
    return errors
  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors])

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price
    }, 0)
    setTot(totalPrice)
  }, [tot, flag, cartItems])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full px-5 lg:px-20 lg:grid lg:gird-cols-1 lg:grid-cols-2 gap-20 h-auto flex flex-col-reverse relative
    items-center justify-center">
      {(Object.keys(formErrors).length === 0 && isSubmit) && popupShow && <PaymentPopup formValues={formValues}/>}
      <form onSubmit={handleSubmit} className="py-2 flex flex-col flex-1 items-center justify-center gap-10">
        <h1 className='text-2xl mb-3'>THÔNG TIN KHÁCH HÀNG</h1>
        {/* input email*/}
        <div className='flex-1 w-full'>
          <p className='text-cartNumBg text-xs'>{formErrors.email}</p>
          <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
            <input 
              type="email"
              name="email" 
              required
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full h-full text-sm bg-transparent outline-none 
              border-none placeholder:text-gray-400 text-textColor"
            />
        </div>  
        </div>
     
        {/* input name and phone */}
        <div className="w-full border-gray-300 flex items-center gap-2">
            <div className='flex flex-col w-full'>
              <p className='text-cartNumBg text-xs'>{formErrors.name}</p>
              <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
                <input 
                    type="text" 
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Họ tên"
                    className="w-full h-full text-sm bg-transparent outline-none 
                    border-none placeholder:text-gray-400 text-textColor"
                />
                </div> 
            </div>
            <div className='flex flex-col w-full'>
              <p className='text-cartNumBg text-xs'>{formErrors.phone}</p>
              <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
              <input 
                  type="text" 
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="w-full h-full text-sm bg-transparent outline-none 
                  border-none placeholder:text-gray-400 text-textColor"
              />
              </div> 
            </div>
        </div>

        {/* input address */}
        <div className='flex flex-col w-full'>
          <p className='text-cartNumBg text-xs'>{formErrors.address}</p>
          <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
            <input 
              type="text" 
              name="address"
              value={formValues.address}
              onChange={handleChange}
              placeholder="Địa chỉ nhận hàng"
              className="w-full h-full text-sm bg-transparent outline-none 
              border-none placeholder:text-gray-400 text-textColor"
            />
        </div>  
        </div>

        <div className="w-full border-gray-300 flex items-center gap-2">
          <div className='flex flex-col w-full'>
            <p className='text-cartNumBg text-xs'>{formErrors.city}</p>
            <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
              <input 
                  type="text" 
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                  placeholder="Tỉnh thành"
                  className="w-full h-full text-sm bg-transparent outline-none 
                  border-none placeholder:text-gray-400 text-textColor"
              />
            </div> 
          </div>
          <div className='flex flex-col w-full'>
            <p className='text-cartNumBg text-xs'>{formErrors.town}</p>
            <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
            <input 
                type="text" 
                name="town"
                value={formValues.town}
                onChange={handleChange}
                placeholder="Quận huyện"
                className="w-full h-full text-sm bg-transparent outline-none 
                border-none placeholder:text-gray-400 text-textColor"
            />
            </div> 
          </div>
        </div>

        <div className="w-full p-3 border border-gray-300 flex flex-col items-center gap-2">
          <textarea 
            type="text" 
            name="note"
            value={formValues.note}
            onChange={handleChange}
            placeholder="Nhập ghi chú nếu cần"
            className="w-full h-[50px] text-sm bg-transparent outline-none 
            border-none placeholder:text-gray-400 text-textColor"
          />
        </div>  
        <button className='mt-[32px] cursor-pointer p-5 w-full lg:w-[400px] h-[58px] rounded-lg border-none font-normal
          text-textBtnBuy bg-bgPayment'
            onClick={handleSubmit}
          >
            TIẾP TỤC
        </button>
        
      </form>
      {/* don hang */}
      <div className="py-2 flex flex-col flex-1 items-center justify-center gap-10">
        <h1 className='text-2xl mb-3'>ĐƠN HÀNG</h1>
        <div className="w-full h-full border border-gray-300 flex flex-col">
            <p className='text-md text-gray-600 px-10 py-4'>Sản Phẩm</p>
            <div className="w-full h-[350px] md:h-42 px-10 flex flex-col gap-3 overflow-y-scroll
            scrollbar">
            {
                cartItems && cartItems.map(item => (
                    <div className="w-full p-2 flex items-center gap-5">
                        <img 
                        src={item?.imageURL} 
                        alt=""
                        className="w-20 h-20 max-w-[60px] object-contain"
                        />
              
                        {/* name section */}
                        <div className="w-full flex flex-col gap-2">
                          <p
                            className="text-base product-title"
                            title={item.title}
                          >{item?.title}</p>
                          <div className='w-full flex items-center justify-between'>
                            <p className="text-base product-title">
                                x {` `}
                                {item.qty}
                            </p>
                            <p className="text-sm font-semibold">
                                {parseInt(item.price*item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
                                <span className="text-sm underline">đ</span>
                            </p>
                          </div>
                        </div>
                    </div>
                ))
            }
            </div>
            <hr className='bg-gray-400'/>
            {/* tong tien */}
            <div className="w-full flex-1 flex flex-col items-center justify-evenly py-2 px-10 gap-3 my-5">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-600 text-md">Thành tiền</p>
                <p className="text-gray-600 text-md">
                  {tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
                  <span className="text-sm underline">đ</span>
                </p>
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="text-gray-600 text-md">Phí vận chuyển</p>
                <p className="text-gray-600 text-md">
                  12,000{` `}
                  <span className="text-sm underline">đ</span>
                </p>
              </div>
              <hr />

              <div className="w-full">
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-600 text-xl font-semibold">TỔNG</p>
                  <p className="text-gray-600 text-xl font-semibold">
                    {(tot+12000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{` `}
                    <span className="text-sm underline">đ</span>
                  </p>
                </div>
              </div>
          </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentContainer