import React, { useState, memo, useEffect, useRef, useContext } from "react";
import logo2 from '../assets/e351cb12-1980-4409-a8c0-679c37ef00e1-removebg-preview.png'
import searchImg from "../assets/Search.svg";
import IconButton from "./littleComponents/IconButton";
import profileImage from "../assets/Group 1000005837.svg";
import { Link, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import logout from "../assets/logout-svgrepo-com.svg";
import leftArrow from "../assets/leftArrow.svg";
import { UserContext } from "../App";
import cross from '../assets/cross.svg'
const DashBoardNavbar = memo(
  ({ user, userImage, setSearch, search , setShowCreateForm, showCreateForm }) => {
    const { handleLogout } = useContext(UserContext);
    const location = useLocation();
    // console.log(location.pathname);
    const [drop, setDrop] = useState(false);
    const handleDropDown = () => {
      setDrop((prev) => !prev);
    };
    
    // create reward  component

    const openRewardForm = () => {
      // Add your code to open the reward form
      setShowCreateForm(true);
    };

    const items = [
      {
        label: (
          <Link onClick={handleDropDown} to="/profile">
            View Profile
          </Link>
        ),
        key: "0",
      },
      {
        label: (
          <Link onClick={handleDropDown} to="/updatePassword">
            Update Password
          </Link>
        ),
        key: "1",
      },
      {
        label: <a href="https://www.aliyun.com">Settings</a>,
        key: "2",
      },
      {
        label: !showCreateForm && location.pathname === "/dashboard" && (
          <div
            onClick={() => {
              handleDropDown();
              openRewardForm();
            }}
          >
            Create Reward
          </div>
        ),
        key: "3",
      },
      {
        type: "divider",
      },
      {
        label: (
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => handleLogout()}
          >
            <h1>LogOut</h1>
            <img
              className="w-[25px] scale-110  h-[25px]  leading-none"
              src={logout}
              alt=""
            />
          </div>
        ),

        key: "4",
      },
    ];

    const handleSearch = (e) => {
      setSearch(e.target.value);
    };

    const clearSearch = () => {
      setSearch("");
    }

    // Use a stable function reference for handleDropDown
    const [fullSearch, setFullSearch] = useState(false);

    const searchInputRef = useRef(null);

    // Effect to focus the search input when fullSearch is true
    useEffect(() => {
      if (fullSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [fullSearch]);
    return (
      <>
        <div className="w-full fixed shadow-lg xs:px-2 sm:px-4 bg-slate-50 flex items-center z-[100] justify-between h-[60px] px-4 xs:h-[50px] sm:h-[60px] transition-all duration-300 ease-in-out ">
          {/* Logo */}
          {!fullSearch && (
            <Link to="/dashboard">
              <div className="flex gap-1 items-center justify-center">
                <img
                  className="w-[50px] h-[50px] xs:w-[25px] xs:h-[25px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]"
                  src={logo2}
                  alt="Logo"
                />
                <h1 className="text-black text-2xl xs:text-xl sm:text-xl md:text-2xl font-headlandOne">
                  PratiFal
                </h1>
              </div>
            </Link>
          )}

          {/* Search */}
          {location.pathname === "/dashboard" && (
            <div className="group sm:flex xs:hidden md:flex  input w-[25vw] shadow mb-1 border rounded py-2 px-3 text-sm text-black focus-within:border-[#58B9ED] hover:border-[#58B9ED] flex items-center justify-between">
              <input
                className="outline-none w-[80%]"
                placeholder="Search your reward"
                onChange={handleSearch}
              />
              <img
                className="w-[15px] h-[15px] opacity-[50%]"
                src={searchImg}
                alt="Search Icon"
              />
            </div>
          )}

          {/* Right Part */}
          {!fullSearch && (
            <div className="flex items-center gap-4 xs:gap-2 font-hanken-grotesk">
              {location.pathname === "/dashboard" && (
                <IconButton text="create" openRewardForm={openRewardForm} />
              )}
             {
              location.pathname === "/dashboard" && (
                <div
                onClick={() => setFullSearch(!fullSearch)}
                className="w-[35px]  cursor-pointer xs:flex sm:hidden h-[35px] rounded-full hover:bg-zinc-200  hover:backdrop-blur-3xl  transition-all duration-300 ease-out  flex items-center justify-center"
              >
                <img
                  className="w-[50%] h-[50%]"
                  src={searchImg}
                  alt="Search Icon"
                />
              </div>
              )
             }
              <div className="flex gap-4 border-[1px] stroke-[0.83] stroke-[#E8EFF]  items-center justify-between px-3 xs:px-1 xs:py-[2px] sm:px-3 sm:py-[7px]  py-[7px] rounded-lg">
                <div className="flex gap-1 items-center">
                  <Link
                    to="/dashboard"
                    className="bg-[#F1F3F7] w-[40px] h-[40px] xs:w-[30px] xs:h-[30px]  sm:w-[40px] sm:h-[40px] border-[1px] border-zinc-600 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden"
                  >
                    {userImage?.length > 4 ? (
                     <div className="flex justify-center items-center w-full bg-center h-full">
                     <img
                       className="object-cover scale-125  transition-all duration-500 ease-in"
                       src={userImage}
                       alt="User"
                     />
                   </div>
                    ) : (
                      <img
                        src={profileImage}
                        className="w-[17px] h-[18px] object-cover"
                        alt="Default Profile"
                      />
                    )}
                  </Link>
                  <div>
                    <p className="text-[8px]">Welcome Back,</p>
                    <p className="text-[16px] xs:text-[12px] sm:text-[16px] capitalize">
                      {user?.username}
                    </p>
                  </div>
                </div>

                <Dropdown
                  onClick={handleDropDown}
                  className="flex cursor-pointer"
                  menu={{ items }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <DownOutlined
                      className={`transition-all duration-200 ease-in ${
                        drop ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                </Dropdown>
              </div>
            </div>
          )}
          {fullSearch && (
            <div className="w-full px-4 h-full  flex items-center justify-around ">
              <img
                onClick={() => setFullSearch(!fullSearch)}
                className="cursor-pointer"
                src={leftArrow}
                alt=""
              />
              <div className="group  input w-[80%] shadow  border rounded-full py-2 px-3 text-sm text-black focus-within:border-[#58B9ED] focus-within: hover:border-[#58B9ED] flex items-center justify-between">
                <input
                  ref={searchInputRef}
                  className="outline-none w-[80%] "
                  placeholder="Search your reward"
                  value={search}
                  onChange={handleSearch}
                />
                <img
                  className="w-[23px] cursor-pointer h-[23px] opacity-[80%]"
                  src={cross}
                  alt="cross Icon"
                  onClick={() => clearSearch()}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default DashBoardNavbar;
