import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate= useNavigate();
  return (
    <div className='container w-full h-full mx-auto px-4 sm:px-6 lg:px-8'>
    <h1 className='text-3xl font-bold text-center mt-5'>Talent Sourcing System</h1>
    <div className='w-full h-full flex items-center justify-center'>
    <div className='flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-8'>
        <div onClick={()=>{navigate('/createCandidate')}} className='bg-main w-full md:w-56 h-52 rounded-lg text-white flex justify-center items-center cursor-pointer'>
            <FaUserPlus className='text-6xl'/>
            <div className='text-2xl'>
                Create a new <span className='text-secondary font-bold'>Candidate</span>
            </div>
        </div>
        <div onClick={()=>{navigate('/candidates')}} className='bg-secondary w-full md:w-56 h-52 rounded-lg text-white cursor-pointer flex justify-center items-center'>
            <FaUsersViewfinder className='text-6xl'/>
            <div className='text-2xl'>
                View all <span className='text-main font-bold'>Candidates</span>
            </div>
        </div>
    </div>
    </div>
</div>
  )
}

export default Home