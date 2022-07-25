import React from 'react'
import { heroData } from '../../utils/data'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'

const HomeContainer = () => {
  return (
    <div id="home" className="grid gird-cols-1 md:grid-cols-2 gap-2 w-full h-[calc[100%-88px]">
      <div className="py-2 flex flex-col flex-1 items-start justify-center gap-6">
        <div className="flex items-center gap-10 justify-start bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold" >Giao Hàng Nhanh</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className=""
              alt="delivery"
            ></img>
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[4rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in {" "}
          <span className="text-orange-600 text-[3rem] md:text-[5rem]">Your City</span>
        </p>

        <p className="text-base text-textColor md:w-[80%] text-justify">
          Chỉ với một cú click chuột hay vài thao tác chạm, bạn có thể mua bất cứ loại thực phẩm nào dù 
          đang ngồi quán cà phê, văn phòng hay thậm chí là ngay tại nhà. <br /> 
          Mỗi hạng mục có rất nhiều các sản phẩm. Mỗi sản phẩm đều có nguồn gốc xuất xứ, giá bán, thành phần 
          dinh dưỡng, tính năng hợp và kỵ trong việc phối hợp các thực phẩm với nhau. <br /> 
          Những sản phẩm được 
          đưa lên Website là những thực phẩm phổ biến, được dùng hàng ngày. Nếu Bạn cần thêm những thực phẩm 
          khác thì cứ đưa ra yêu cầu, PunMARKET sẽ báo giá và đáp ứng cho bạn.
        </p> 

        <button 
          type="button" 
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto
          px-4 py-2 rounded-lg hover:shadow-lg transtion-all ease-in-out duration-100">
          Mua ngay
        </button>

      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} className="ml-auto w-full lg:w-auto h-420 lg:h-685" alt="hero-bg" />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroData && heroData.map(item=> (
            <div key={item.id} className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
            <img src={item.imgSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" ></img>
            <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">{item.name}</p>
            <p className="text-[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3">{item.decp}</p>
            <p className="text-sm font-semibold text-headingColor">
              <span className="text-xs text-red-600">$</span> {item.price}
            </p>
          </div>
          ))}
          
        </div>
      
      </div>
    </div>
  )
}

export default HomeContainer