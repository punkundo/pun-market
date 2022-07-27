import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { categories } from '../../utils/data'

import { 
  MdOutlineDriveFileRenameOutline, 
  MdCloudUpload, 
  MdDelete, 
  MdFoodBank,
} from 'react-icons/md'
import Loader from '../Loader/Loader'
import { storage } from '../firebase.config'
import { useStateValue } from '../../context/StateProvider'
import { getAllItems, saveItems } from '../../utils/firebaseFunctions'
import { actionType } from '../../context/reducer'
import { useEffect } from 'react'

const CreateItemContainer = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState('danger')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [{}, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
    }, 
    (error) => {
      console.log(error)
      setFields(true)
      setMsg('Error while uploading: Try again')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageAsset(downloadURL)
        setIsLoading(false)
        setFields(true)
        setMsg('Tải lên ảnh sản phẩm thành công')
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Xóa ảnh thành công!')
      setAlertStatus('success')
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  const saveDetails = () => {
    setIsLoading(true)
    try{
      if (!title || !description || !imageAsset || !price || !category) {
        setFields(true)
        setMsg("Không để trống")
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      }
      else {
          const data = {
            id: `${Date.now()}`,
            title: title,
            imageURL: imageAsset,
            category: category,
            description: description,
            qty: 1, 
            price: price
          }
          saveItems(data)
          setIsLoading(false)
          setFields(true)
          setMsg('Tải lên sản phẩm thành công!')
          clearData()
          setAlertStatus('success')
          setTimeout(() => {
            setFields(false)
          }, 4000)
      }
    } catch(error) {
      console.log(error)
      setFields(true)
      setMsg('Lỗi tải lên: Thử lại')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)

      fetchData()
    }
  }

  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setDescription("")
    setPrice("")
    setCategory("Loại sản phẩm")
  }

  const fetchData = async() => {
    await getAllItems().then(data => {
      dispatch({
        type: actionType.SET_MARKET_ITEMS,
        marketItems: data,
      })
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4
      flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center ${alertStatus === 'danger' ?
          'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}
          >
            {msg}
          </motion.p>
        )}
        
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdOutlineDriveFileRenameOutline className="text-xl text-gray-700" />
          <input 
            type="text" 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tên sản phẩm"
            className="w-full h-full text-lg bg-transparent outline-none 
            border-none placeholder:text-gray-300 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            value={category}
            className="outline-none w-full text-base boder-b-2
            border-gray-200 p-2 rounded-md cursor cursor"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white">Loại sản phẩm</option>
            {categories && categories.map(item => (
              <option key={item.id} className="text-base border-0
                outline-none capitalize bg-white text-headingColor"
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col
        border-2 border-dotted border-gray-300 w-full h-225 md:h-420
        cursor-pointer rounded-lg">
          {isLoading ? <Loader /> : <>
            {!imageAsset ? (
              <>
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                  <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"/>
                  <p className="text-gray-500 hover:text-gray-700">Ảnh sản phẩm</p>
                  <input 
                    type="file" 
                    name="uploadimage" 
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                    />
                </label>
            </>
            ) : (
              <>
                <div className="relative h-full">
                  <img 
                    src={imageAsset} 
                    alt="uploadedImage" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button" 
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer 
                    outline-none hover:shadow-lg duration-500 transition:all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white"/>
                  </button>
                </div>
              </>
            )}
          </>}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFoodBank className="text-gray-700 text-2xl"/>
              <textarea 
                type="textarea" 
                name="textValue"
                rows="3"
                require 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả" 
                className="w-full h-full text-lg bg-transparent outline-none border-none 
                placeholder:text-gray-400 text-textColor"/>

          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <span className="text-xl underline">đ</span> 
              <input 
                type="text" 
                require 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Giá" 
                className="w-full h-full text-lg bg-transparent outline-none border-none 
                placeholder:text-gray-400 text-textColor"/>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full" >
          <button 
            className="w-full md:w-auto border-none outline-none
          bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateItemContainer