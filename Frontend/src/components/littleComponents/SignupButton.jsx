import React from "react";
import { Link } from "react-router-dom";

const SignupButton = ({text , color , textColor}) => {
  return (
    <Link
      className={`${color} py-2 px-7  xs:px-4 sm:px-4 md:px-7 lg:px-7 xl:px-7 2xl:px-7 rounded-3xl text-[12px]  flex items-center tracking-normal justify-center ${textColor} font-headlandOne transition-all duration-500 ease-in-out  hover:bg-[#58B9ED] hover:text-black`}
      to="/register"
    >
      {text}
    </Link>
  );
};

export default SignupButton;
