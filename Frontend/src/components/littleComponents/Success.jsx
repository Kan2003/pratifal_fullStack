import React from 'react'

import check from "../../assets/check-svgrepo-com.svg";
const Success = ({success}) => {
  return (
    <div className=" absolute transition-all z-[1000] duration-300 ease-in top-5 left-1/2 flex items-center gap-2 w-fit -translate-x-1/2 rounded-lg bg-[#dad8d891] py-2 px-6">
          <img className="w-[20px] h-[20px]" src={check} alt="" />
          <p className="text-black text-center">{success}</p>
        </div>
  )
}

export default Success