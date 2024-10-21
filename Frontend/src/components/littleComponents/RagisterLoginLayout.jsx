import React from "react";
import speaker from "../../assets/66f2e8b62f0f951eb6f22fb9_Frame.png";
import instagram from "../../assets/Instagram.svg";
import linkedin from "../../assets/LinkedIn.svg";
import facebook from "../../assets/Facebook.svg";
import twitter from "../../assets/Twitter.svg";

const RagisterLoginLayout = () => {
  return (
    <div className="w-[50vw] h-full py-[5vw] px-[7vh]  gap-3 flex items-start flex-col font-headlandOne">
      <div className=" w-full">
        <h1 className="text-[26px] text-black font-headlandOne tracking-normal">
          All Your Rewards, At Your{" "}
          <span className="text-[#58B9ED]">Fingertips.</span>
        </h1>
      </div>
      <p className="text-[17px] leading-[150%] tracking-tight">
        "Tired of juggling rewards from multiple platforms? Our app offers a
        centralized solution to store and manage all your rewards in one secure
        place... ”
      </p>
      <div className="bg-zinc-400 w-full h-[400px] mt-3 rounded-xl relative overflow-hidden">
        <div className="w-[70px] h-[70px] bg-[#ffffff1a]  top-[15px] left-[15px] absolute rounded-[20%] flex items-center justify-center ">
          <div className="w-[50px] h-[50px] bg-[#D9D9D9] rounded-[20%] flex items-center justify-center">
            <img
              className="w-[27.5px] h-[27.5px] cursor-pointer stroke-black z-20"
              src={speaker}
              alt=""
            />
          </div>
        </div>
        <video
          autoPlay
          playsInline
          muted
          loop
          src="https://res.cloudinary.com/dpav8ilgm/video/upload/v1728385813/Untitled_Video_1_qdg3c2.mp4"
          className="w-full h-full object-cover"
        ></video>
      </div>
      <div className="flex items-center justify-center w-full gap-3">
        <img className="cursor-pointer" src={instagram} alt="" />
        <img className="cursor-pointer" src={facebook} alt="" />
        <img className="cursor-pointer" src={twitter} alt="" />
        <img className="cursor-pointer" src={linkedin} alt="" />
      </div>
      <p className="text-center text-sm w-full tracking-tighter">
        connect for more update.
      </p>
    </div>
  );
};

export default RagisterLoginLayout;
