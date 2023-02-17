import { useAnimation } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Checkoutsuccess = () => {
  const navigate=useNavigate()
  function notifysuccess(){toast.success("Item Bought Successfully!!")}
  notifysuccess()
  return (
    <div className='d-flex justify-content-center align-items-center flex-column  '>
      <div className='text-center iinfo' >Item Bought Successfully...!</div>
      <button className='btn btn-primary backbtn' onClick={()=>{navigate('/home')}} >Back to home</button>
      <ToastContainer/>
    </div>
  )
}

export default Checkoutsuccess