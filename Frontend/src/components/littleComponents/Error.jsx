import React from 'react'
import cross from "../../assets//cross-mark-svgrepo-com.svg";

const Error = ({error}) => {
  return (
    <div className=" absolute transition-all duration-300 ease-in top-5 left-1/2 z-[1000] flex items-center gap-2 w-fit -translate-x-1/2 rounded-lg bg-[#dad8d891] py-2 px-6">
    <img className="w-[20px] h-[20px]" src={cross} alt="" />
    <p className="text-black text-center">{error}</p>
  </div>
  )
}

export default Error