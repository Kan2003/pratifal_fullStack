import React from "react";
import { Link } from "react-router-dom";

import SignupButton from "./littleComponents/SignupButton";
import profileImage from "../assets/Group 1000005837.svg";
import login from "../assets/login-svgrepo-com.svg";
import logout from "../assets/logout-svgrepo-com.svg";
import logo2 from "../assets/e351cb12-1980-4409-a8c0-679c37ef00e1-removebg-preview.png";

const Navbar = ({ user, profile, handleLogout }) => {
  return (
    <div className="w-full fixed top-0 left-0 shadow-lg bg-slate-50 flex items-center z-[100] justify-between h-[64px] px-3 md:px-6">
      {/* logo */}
      <a href="#hero" className="flex gap-2 items-center">
        <img className="w-[46px] h-[46px] object-contain" src={logo2} alt="Pratifal" />
        <h1 className="text-black text-2xl xs:text-xl md:text-2xl font-headlandOne">PratiFal</h1>
      </a>

      {/* section links (desktop) */}
      <div className="hidden lg:flex items-center gap-7 font-headlandOne text-sm text-zinc-600">
        <a href="#features" className="hover:text-black transition-colors">Features</a>
        <a href="#how" className="hover:text-black transition-colors">How it works</a>
        <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
      </div>

      {/* right side — login / profile / logout (unchanged logic) */}
      <div className="flex gap-3 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            {/* logout */}
            <div className="bg-zinc-300 hover:bg-zinc-400 transition-colors cursor-pointer py-1 px-3 rounded-3xl tracking-wide font-headlandOne flex items-center gap-[2px]">
              <Link onClick={() => handleLogout()} className="text-[12px] pl-2">Logout</Link>
              <img className="w-[28px] h-[28px]" src={logout} alt="" />
            </div>
            {/* profile -> dashboard */}
            <Link
              to="/dashboard"
              className="bg-[#F1F3F7] w-[48px] h-[48px] border border-zinc-600 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {profile?.length > 4 ? (
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500 ease-in"
                  src={profile}
                  alt="Profile"
                />
              ) : (
                <img src={profileImage} className="w-[17px] h-[18px] object-cover" alt="Profile" />
              )}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <SignupButton text="Sign Up" color="bg-[#18181b]" textColor="text-white" />
            <div className="bg-zinc-300 hover:bg-zinc-400 transition-colors xs:px-1 md:px-3 cursor-pointer py-1 px-3 rounded-3xl tracking-wide font-headlandOne flex items-center gap-[2px]">
              <Link className="text-[12px] pl-2 xs:text-[10px]" to="/login">Login</Link>
              <img className="w-[26px] h-[26px] xs:w-[20px] xs:h-[20px] sm:w-[26px] sm:h-[26px]" src={login} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
