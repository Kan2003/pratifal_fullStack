import React from 'react'
import cross from "../../assets//cross-mark-svgrepo-com.svg";

const Error = ({error}) => {
  return (
    <div className=" absolute transition-all duration-300 ease-in top-5 left-1/2 z-[1000] flex items-center gap-2 w-fit -translate-x-1/2 rounded-lg bg-[#dad8d8c5] py-2 px-6">
    <img className="w-[20px] xs:w-[15px] xs:h-[15px] sm:w-[15px] sm:h-[15px] h-[20px]" src={cross} alt="" />
    <p className="text-black xs:text-[12px] sm:text-[15px] text-center">{error}</p>
  </div>
  )
}

export default Error