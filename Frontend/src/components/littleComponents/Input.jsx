import React, { useState } from "react";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";

const Input = React.memo(
  ({
    error,
    id,
    type,
    placeholder,
    value,
    handleChange,
    handleBlur,
    text,
    passwordCheck,
    passwordIcon,
  }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
      <div
        className={`shadow-sm mb-[2px] appearance-none border rounded w-full  text-sm text-black focus:outline-none focus:border-[#58B9ED] ${
          !error && "hover:border-[#58B9ED]"
        } ${!error && "hover:focus:border-[#58B9ED]"} ${error && "border-red-500"}`}
      >
        <input
          className="w-full h-full pr-10 py-2 px-3  outline-none " // added padding-right for the icon
          id={id}
          type={showPassword ? "text" : type} // Toggle between text and password
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Show/Hide Password Icon */}
        {passwordCheck && passwordIcon && (
          <div
            className="absolute top-[20%] right-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={hide} alt="" />
            ) : (
              // <EyeIcon className="w-5 h-5 text-gray-600" />
              <img src={show} alt="" />
            )}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-red-500 text-sm">{text}</p>
      ) : (
        <p className="text-sm opacity-0">djkhkickd</p>
      )}
    </div>
      // <div className="">
      //   <div
      //     className={`shadow-sm mb-[2px] appearance-none border rounded w-full py-2 px-3 text-sm text-black focus:outline-none focus:border-[#58B9ED] ${
      //       !error && "hover:border-[#58B9ED]"
      //     }  ${!error && "hover:focus:border-[#58B9ED]"}   ${
      //       error && "border-red-500"
      //     }`}
      //   >
      //     <input
      //       className="w-full h-full "
      //       id={id}
      //       type={type}
      //       placeholder={placeholder}
      //       value={value}
      //       onChange={handleChange}
      //       onBlur={handleBlur}
      //     />
      //   </div>
      //   {error ? (
      //     <p className="text-red-500 text-sm">{text}</p>
      //   ) : (
      //     <p className="text-sm opacity-0">djkhkickd</p>
      //   )}
      // </div>
    );
  }
);

export default Input;
