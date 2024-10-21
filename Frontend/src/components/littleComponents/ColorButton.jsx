import React from "react";

const ColorButton = ({ color, text }) => {
  return <div className={`inline-block text-[25px] xs:text-[18px] sm:text-[18px] md:text-[20px]  lg:text-[25px] xl:text-[25px] 2xl:text-[25px] tracking-[-2%]  font-bold px-4 py-[8px] rounded-full ${color} font-Harmattan`}>{text}</div>;
};

export default ColorButton;
