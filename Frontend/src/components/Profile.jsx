import React, { useContext, useRef, useState } from "react";

import image from "../assets/Frame 322.png";
import profileImage from "../assets/Group 1000005837.svg";
import plus from '../assets/Plus.svg'
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";

import EditProfile from "./littleComponents/EditProfile";

import ImageUpload from "./littleComponents/ImageUpload";
import { UserContext } from "../App";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [theme, setTheme] = useState(false);

  const handleProfile = () => {
    setEditProfile(!editProfile);
    setTheme(false);
  };
  const handleTheme = () => {
    setTheme(!theme);
    setEditProfile(false);
  };

  // image upload

  const [imageUpload, setImageUpload] = useState(false);

  const showImageUploader = () => {
    console.log("checkinggggggg");
    setImageUpload(true);
  };

  return (
    <>
      <div className="w-full  pt-[5vw] xs:pt-[10vw] md:pt-[5vw] h-screen">
        <img
          className="w-full relative h-[18vh] xs:hidden lg:block"
          src={image}
          alt=""
        />
        {error && <Error error={error} />}
        {success && <Success success={success} />}

        <div className="w-full flex xs:flex-col sm:flex-row xs:pt-[10vw] sm:pt-[5vw] lg:pt-0 px-[10vw] md:px-[5vw] xs:px-[5vw] items-center xs:gap-5 md:gap-0  justify-between">
          <div className="w-full flex xs:flex-col sm:flex-row items-center  gap-4">
            <div className="w-[120px] h-[120px]  border-[6px] border-opacity-[50%] overflow-hidden rounded-full border-[#58B9ED]">
              {user?.profile?.length > 4 ? (
                <img
                  className="w-full h-full scale-110 brightness-125 object-cover"
                  src={user?.profile}
                  alt="User"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <img
                    src={profileImage}
                    className="w-[50px] h-[50px] object-cover rounded-lg"
                    alt="Default Profile"
                  />
                </div>
              )}
            </div>
            <div className="userInfo flex flex-col gap-1">
              <div className="flex items-center  gap-2">
                {/* <img className="w-[20px] h-[20px]" src={userLogo} alt="" /> */}
                <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                  Fullname :{" "}
                </h1>
                <h1 className="font-headlandOne text-[15px] xs:text-[13px] sm:text-[15px] ">
                  {user?.fullname}
                </h1>
              </div>
              <div className="flex items-center  gap-2">
                <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                  Username :{" "}
                </h1>
                <h1 className="font-headlandOne text-[15px] xs:text-[13px] sm:text-[15px] ">
                  {user?.username}
                </h1>
              </div>
              <div className="flex items-center  gap-2">
                <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                  Email :{" "}
                </h1>
                <h1 className="font-headlandOne text-[15px] xs:text-[13px] sm:text-[15px] ">{user?.email}</h1>
              </div>
            </div>
          </div>
          <div onClick={showImageUploader} className="w-[30%] xs:w-full xs:flex xs:items-center xs:justify-center  sm:w-[30%] ">
            <button
              className={`bg-black xs:px-2 xs:py-2 sm:flex  xs:text-[11px] xs:gap-1 sm:px-2 sm:py-2 sm:text-[13px] sm:gap-2  py-2 px-4 rounded-3xl text-[13px] font-light flex items-center tracking-wider justify-center text-white font-headlandOne transition-all duration-500 gap-2 ease-in-out  hover:bg-[#58B9ED] hover:text-black `}
            >
              <span className="w-[11px] h-[10px] ">
                <img className="stroke-zinc-900" src={plus} alt="" />
              </span>
                Upload Profile Image
            </button>
          </div>
        </div>

        <div className="details w-full px-[10vw] xs:px-[5vw] lg:px-[10vw] flex xs:flex-col sm:flex-row sm:items-start sm:justify-start xs:items-center xs:justify-center gap-[10vw] pt-[4vw] ">
          <div className="flex flex-col xs:flex-row sm:flex-col gap-4">
            <div
              onClick={handleProfile}
              className={`w-[13vw] xs:w-fit xs:h-fit ${
                editProfile ? "bg-[#58B9ED]" : "bg-slate-100"
              }  px-2 py-3 text-center rounded-lg cursor-pointer `}
            >
              <h4 className="xs:text-[12px] sm:text-[15px] font-hanken-grotesk "   >Edit Profile Details</h4>
            </div>
            <div
              onClick={handleTheme}
              className={`w-[13vw] xs:w-fit xs:h-fit ${
                theme ? "bg-[#58B9ED]" : "bg-slate-100"
              }  px-2 py-3 text-center rounded-lg cursor-pointer `}
            >
              <h4 className="xs:text-[12px] sm:text-[15px] font-hanken-grotesk">Change Theme</h4>
            </div>
          </div>
          {editProfile && !theme && (
            <EditProfile setError={setError} setSuccess={setSuccess} />
          )}
          {theme && !editProfile && (
            <div className="bg-slate-100 w-[55%] xs:w-[90%] sm:w-[55%]  px-4 py-2 rounded-lg gap-4 flex flex-col">
              <h1 className="font-Harmattan text-[30px] opacity-[40%] text-center">
                Select Theme
              </h1>
              <div className="w-full flex justify-center gap-3">
                <div>
                  <div className="w-[45px] h-[45px] bg-zinc-500 cursor-pointer rounded-lg"></div>
                  <h5 className="text-[15px] text-center font-Harmattan">
                    Black
                  </h5>
                </div>
                <div>
                  <div className="w-[45px] h-[45px] bg-zinc-600 cursor-pointer rounded-lg"></div>
                  <h5 className="text-[15px] text-center font-Harmattan">
                    Black
                  </h5>
                </div>
                <div>
                  <div className="w-[45px] h-[45px] bg-zinc-700 cursor-pointer rounded-lg"></div>
                  <h5 className="text-[15px] text-center font-Harmattan">
                    Black
                  </h5>
                </div>
                <div>
                  <div className="w-[45px] h-[45px] bg-zinc-800 cursor-pointer rounded-lg"></div>
                  <h5 className="text-[15px] text-center font-Harmattan">
                    Black
                  </h5>
                </div>
                <div>
                  <div className="w-[45px] h-[45px] bg-zinc-900 cursor-pointer rounded-lg"></div>
                  <h5 className="text-[15px] text-center font-Harmattan">
                    Black
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {imageUpload && (
        <ImageUpload
          setImageUpload={setImageUpload}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
};

export default Profile;
