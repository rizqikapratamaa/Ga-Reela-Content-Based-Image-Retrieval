import React from 'react'
import icon from '../assets/ga-reela-crop.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="sticky top-4 bg-[#333] py-[10px] z-20 mx-12 flex text-white items-center justify-between rounded-[15px]">
    <img src={icon} className='h-[25px] ml-[25px]'/>
      <ul className='flex flex-row gap-x-[170px]'>
        <li>
          <Link to="/" className='hover:text-black cursor-pointer transition-all'>
            <span className='font-inter-bold'>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/cbir" className='hover:text-black cursor-pointer transition-all'>
          <span className='font-inter-bold'>CBIR</span>
            </Link>
        </li>
        <li>
          <Link to="/about-us" className='hover:text-black cursor-pointer transition-all'>
            <span className='font-inter-bold'>About Us</span> 
          </Link>
        </li>
      </ul>
      <div />
    </nav>
  )
}

export default Navbar