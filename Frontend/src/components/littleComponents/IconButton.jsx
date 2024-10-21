import React, { useEffect } from 'react'
import plus from '../../assets/Plus.svg'
const IconButton = ({text , icon , openRewardForm }) => {
  
  
  return (
    <button
    onClick={openRewardForm}
    className={`bg-black xs:px-2 xs:py-2 xs:hidden sm:flex  xs:text-[11px] xs:gap-1 sm:px-4 sm:py-2 sm:text-[13px] sm:gap-2  py-2 px-4 rounded-3xl text-[13px] font-light flex items-center tracking-wider justify-center text-white font-headlandOne transition-all duration-500 gap-2 ease-in-out  hover:bg-[#58B9ED] hover:text-black `}
  >
    <span className='w-[11px] h-[10px] '>
        <img className='stroke-zinc-900' src={plus} alt="" />
    </span>
    {text}
  </button>
  )
}

export default IconButton