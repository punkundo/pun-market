import React from 'react'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'

const PaymentPopup = ({formValues}) => {
  const [{ popupShow }, dispatch] = useStateValue()

  const closePopup = () => {
    dispatch({
      type: actionType.SET_POPUP_SHOW,
      popupShow: !popupShow,
    })
  }

  return (
    <div className="w-[700px] h-auto border bg-white border-gray-800 flex flex-col z-[102] absolute left-[27%]">
      <div className='flex items-center justify-between p-5'>
        <p className='text-md text-gray-600 font-semibold'>ĐẶT HÀNG THÀNH CÔNG</p>
        <GrClose className='cursor-pointer'
        onClick={closePopup}/>
      </div>
      <hr />
      <p className='text-md text-gray-600 px-10 py-4 text-justify'>
      Xin chào {formValues.name}!
      </p>
      <p className='text-md text-gray-600 px-10 pb-4 text-justify'>Cảm ơn bạn đã tin tưởng và ủng hộ PunMARKET. Đơn hàng của bạn đang được xử lí và đóng gói.
      Trong vòng 24h tới (ngoại trừ thứ 7, chủ nhật và các ngày lễ) bạn sẽ nhận được Email thông báo khi đơn hàng bắt đầu được gửi cho hãng vận chuyển cùng mã vận đơn để bạn có thể kiểm tra tình trạng của đơn hàng.</p>
      <hr />
    </div>
  )
}

export default PaymentPopup