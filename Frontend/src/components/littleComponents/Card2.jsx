import React, { useState } from "react";
import del from "../../assets/delete.svg";
import star from "../../assets/star_off.svg";
import onStar from "../../assets/star_on.svg";
import edit from "../../assets/edit.svg";
import flipkart from "../../assets/flipkart.png";
import copy from "../../assets/copy.svg";
import image from '../../assets/—Pngtree—online shopping linear coupon_4867024.png'
import axios from "axios";
import EditReward from "../EditReward";
const API_URl = import.meta.env.VITE_API_URL;
const Card2 = ({ reward, id, totalReward, setTotalReward }) => {

    const coupon = reward.couponCode;
    const date = new Date(reward.expiryDate);
  
    // Manually format the date as 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");
  
    const formattedDate = `${day}-${month}-${year}`;
  
    const handleClipboard = async () => {
      try {
        await navigator.clipboard.writeText(coupon);
      } catch (err) {
        console.log(err);
      }
    };
  
    // delete Card
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`${API_URl}/reward/delete-reward/${id}`, {
          withCredentials: true, // Include credentials (cookies) in the request
        });
        console.log(response.data);
        if (response.status === 200) {
          const updatedRewards = totalReward.filter((r) => r._id !== id)
          setTotalReward(updatedRewards);
  
          // console.log(updatedRewards , 'updated')
  
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // starrred
  
    const toggleStarred = async () => {
      try {
        const response = await axios.patch(
          `${API_URl}/reward/toggle-reward/${id}`, 
          {}, // Empty body if no request data is needed
          {
            withCredentials: true, // Moved to the Axios config object
          }
        );
  
        if (response.status === 200) {
          const toggleReward = response.data.message;
          // console.log(toggleReward,'toggleREward')
          const updatedRewards = totalReward.map((r) =>
            r._id === id ? { ...r, starred: toggleReward.starred } : r
          );
          setTotalReward(updatedRewards);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // edit card
    const [isEdit, setIsEdit] = useState(false);
    const handleEditCard = () => {
      setIsEdit(true);
    };

    
  return (
    <>
    <div className="w-[300px] bg-custom-gradient overflow-hidden relative h-[190px] text-white rounded-2xl bg-[#d9d9d971] flex flex-col justify-between px-[10px] py-[8px] border-[1px] bg-bottom bg-cover border-zinc-500 shadow-md  object-cover ">
      <div className="absolute left-[-28px] bottom-[-28px] w-[100px] h-[100px] rotate-45 z-[1]">
        <img className="w-full h-full bg-cover" src={image} alt="" />
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center justify-center">
          {/* <img className="w-[20px] h-[20px] " src={flipkart} alt="" /> */}
          <h2 className="capitalize text-black font-medium font-lato">{reward.title}</h2>
        </div>
        <div className="flex gap-2">
          <img
            onClick={handleEditCard}
            className="w-[19px] cursor-pointer"
            src={edit}
            alt=""
          />
          <img
            className="w-[25px] cursor-pointer"
            onClick={handleDelete}
            src={del}
            alt=""
          />

          <img
            className={`w-[17px] cursor-pointer text-white`}
            src={reward.starred ? onStar : star}
            onClick={toggleStarred}
            // src={star}
            alt=""
          />
        </div>
      </div>
      <div className=" z-[2] w-full overflow-hidden font-hanken-grotesk italic text-black font-normal tracking-[2%]">
        <div className="flex leading-tight items-center gap-2">
          <h2 className="coupon z-[2] text-[18px] uppercase">{coupon}</h2>
          <img
              onClick={handleClipboard}
            className="cursor-pointer text-white"
            src={copy}
            alt=""
          />
        </div>
        <h4 className="leading-tight z-[2] text-[14px] ">{formattedDate}</h4>
        <p className="tracking-wide leading-[105%] text-[11px] w-[70%]  z-[100]">
        {reward.description}
        </p>
      </div>
    </div>
      {/* edit part */}
      {isEdit && <EditReward reward={reward} setIsEdit={setIsEdit} totalReward={totalReward} setTotalReward={setTotalReward} />} 
    </>
  );
};

export default Card2;
