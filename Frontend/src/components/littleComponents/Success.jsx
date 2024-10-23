import React from "react";

import check from "../../assets/check-svgrepo-com.svg";
const Success = ({ success }) => {
  return (
    <div className=" absolute transition-all z-[1000] duration-300 ease-in top-5 left-1/2 flex items-center gap-2 w-fit -translate-x-1/2 rounded-lg bg-[#dad8d8c5] py-2 px-6">
      <img
        className="w-[20px] xs:w-[15px] xs:h-[15px] sm:w-[15px] sm:h-[15px] h-[20px]"
        src={check}
        alt=""
      />
      <p className="text-black text-center xs:text-[12px] sm:text-[15px]">
        {success}
      </p>
    </div>
  );
};

export default Success;
