import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SignupButton from "./littleComponents/SignupButton";
import profileImage from "../assets/Group 1000005837.svg";
import login from "../assets/login-svgrepo-com.svg";
import logout from "../assets/logout-svgrepo-com.svg";

const Navbar = ({ user, profile }) => {
  return (
    <div className="w-full fixed shadow-lg bg-slate-50 flex items-center z-[100] justify-between  h-[60px] px-2 ">
      <div>
        <div className="flex gap-1 items-center justify-center">
          <img className="w-[50px] h-[50px]" src={logo} alt="" />

          <h1 className="text-black text-2xl font-headlandOne">PratiFal</h1>
        </div>
      </div>
      <div className="flex gap-5">
        {user ? (
          <div className="flex items-center  gap-4">
            {/* // logout button functionality is remaining */}
            <div className="bg-zinc-400 cursor-pointer group py-1 px-3 rounded-3xl tracking-wide  font-headlandOne flex items-center gap-[2px]">
              <Link className="text-[12px] pl-2">Logout</Link>

              <img className="w-[30px] h-[30px]" src={logout} alt="" />
            </div>
            <Link
              to="/dashboard"
              className="bg-[#F1F3F7] w-[48px] border-[1px] border-zinc-600 h-[48px] rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {profile?.length > 4 ? (
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500 ease-in"
                  src={profile}
                />
              ) : (
                <img
                  src={profileImage}
                  className="w-[17px] h-[18px] object-cover"
                />
              )}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <SignupButton
              text="Sign Up for free"
              color="bg-zinc-900"
              textColor="text-white"
            />
            <div className="bg-zinc-400 cursor-pointer group py-1 px-3 rounded-3xl tracking-wide  font-headlandOne flex items-center gap-[2px]">
              <Link className="text-[12px] pl-2" to="/login">
                Login
              </Link>

              <img className="w-[30px] h-[30px]" src={login} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
