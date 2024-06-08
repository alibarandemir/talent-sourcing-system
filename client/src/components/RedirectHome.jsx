import React from 'react'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function RedirectHome() {
  const navigate= useNavigate()
  return (
    <div onClick={()=>{navigate('/home')}} className=' z-40 bg-main rounded-xl w-12 h-12 flex justify-center items-center fixed cursor-pointer top-20 left-0'>
      <FaHome className='text-secondary text-xl'/>
    </div>
  )
}

export default RedirectHome