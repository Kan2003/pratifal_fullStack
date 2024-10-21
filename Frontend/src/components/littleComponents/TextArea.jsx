import React from 'react'

const TextArea = ({error , id , type , placeholder , value , handleChange , handleBlur , text}) => {
    return (
        <div className="">
        <textarea
          className={`h-[60px] resize-none shadow  appearance-none border rounded w-full py-2 px-3 text-sm text-black focus:outline-none focus:border-[#58B9ED]   ${
            !error && "hover:border-[#58B9ED]"
          }  ${!error && "hover:focus:border-[#58B9ED]"}   ${
            error && "border-red-500"
          }`}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          ></textarea>
        {error ? (
          <p className="text-red-500 text-sm">
            {text}
          </p>
        ) : (
          <p className="text-sm opacity-0">djkhkickd</p>
        )}
      </div>
      )
}

export default TextArea