import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <div className='bg-main flex justify-center items-center w-full z-50 min-h-10 fixed bottom-0 gap-x-5'>
        <div className='flex'>
            <ul className='flex gap-x-4 justify-center items-center'>
                <li><a target='_blank' href='https://github.com/alibarandemir'><FaGithub className='text-white text-2xl hover:text-secondary'/></a></li>
                <li><a target='_blank' href='https://www.linkedin.com/in/ali-baran-demir-55b0181b4/'><FaLinkedin className='text-white text-2xl hover:text-secondary'/></a></li>

            </ul>
        </div>
        <p className='text-white'>
            &Copy; 2024 Ali Baran Demir
        </p>
        



    </div>
  )
}

export default Footer