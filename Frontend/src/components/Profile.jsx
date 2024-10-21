import React, { useContext, useRef, useState } from "react";

import image from "../assets/Frame 322.png";
import profileImage from "../assets/Group 1000005837.svg";

import IconButton from "./littleComponents/IconButton";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";

import EditProfile from "./littleComponents/EditProfile";

import ImageUpload from "./littleComponents/ImageUpload";
import { UserContext } from "../App";
const Profile = () => {

  const { user , setUser } = useContext(UserContext);


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [theme, setTheme] = useState(false);


  const handleProfile = () => {
    setEditProfile(!editProfile);
    setTheme(false)
  }
  const handleTheme = () => {
    setTheme(!theme);
    setEditProfile(false)
  }


  // image upload 

  const [imageUpload , setImageUpload] = useState(false);

  const showImageUploader = () => {
    console.log('checkinggggggg')
    setImageUpload(true);
  };

  return (
    <>
    
    <div className="w-full  pt-[5vw] h-screen">
      <img className="w-full relative" src={image} alt="" />
      {error && <Error error={error} />}
      {success && <Success success={success} />}

      <div className="w-full flex px-[10vw] items-center  justify-between">
        <div className="w-full flex items-center  gap-4">
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
              <h1 className="font-headlandOne text-[15px]">{user?.fullname}</h1>
            </div>
            <div className="flex items-center  gap-2">
              <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                Username :{" "}
              </h1>
              <h1 className="font-headlandOne text-[15px]">{user?.username}</h1>
            </div>
            <div className="flex items-center  gap-2">
              <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                Email :{" "}
              </h1>
              <h1 className="font-headlandOne text-[15px]">{user?.email}</h1>
            </div>
          </div>
        </div>
        <div onClick={showImageUploader}  className="w-[30%]">
          <IconButton text="Update profile Image" />
        </div>
      </div>

      <div className="details w-full px-[10vw] flex gap-[10vw] pt-[4vw] ">
        <div className="flex flex-col gap-4">
          <div
            onClick={handleProfile}
            className={`w-[13vw] ${
              editProfile ? "bg-[#58B9ED]" : "bg-slate-100"
            }  px-2 py-3 text-center rounded-lg cursor-pointer `}
          >
            <h4>Edit Profile Details</h4>
          </div>
          <div onClick={handleTheme} 
           className={`w-[13vw] ${
            theme ? "bg-[#58B9ED]" : "bg-slate-100"
          }  px-2 py-3 text-center rounded-lg cursor-pointer `}>
            <h4>Change Theme</h4>
          </div>
        </div>
        {(editProfile && !theme) && (<EditProfile setError={setError} setSuccess={setSuccess}/>)}
        {(theme && !editProfile)  && (
          <div className="bg-slate-100 w-[55%]  px-4 py-2 rounded-lg gap-4 flex flex-col">
             <h1 className="font-Harmattan text-[30px] opacity-[40%] text-center">Select Theme</h1>
             <div className="w-full flex justify-center gap-3">
              <div>
                <div className="w-[45px] h-[45px] bg-zinc-500 cursor-pointer rounded-lg"></div>
                <h5 className="text-[15px] text-center font-Harmattan">Black</h5>
              </div>
              <div>
                <div className="w-[45px] h-[45px] bg-zinc-600 cursor-pointer rounded-lg"></div>
                <h5 className="text-[15px] text-center font-Harmattan">Black</h5>
              </div>
              <div>
                <div className="w-[45px] h-[45px] bg-zinc-700 cursor-pointer rounded-lg"></div>
                <h5 className="text-[15px] text-center font-Harmattan">Black</h5>
              </div>
              <div>
                <div className="w-[45px] h-[45px] bg-zinc-800 cursor-pointer rounded-lg"></div>
                <h5 className="text-[15px] text-center font-Harmattan">Black</h5>
              </div>
              <div>
                <div className="w-[45px] h-[45px] bg-zinc-900 cursor-pointer rounded-lg"></div>
                <h5 className="text-[15px] text-center font-Harmattan">Black</h5>
              </div>

             </div>
          </div>
        )}

      </div>
    </div>
    {imageUpload && <ImageUpload setImageUpload={setImageUpload} user={user} setUser={setUser} /> }
    </>
  );
};

export default Profile;
