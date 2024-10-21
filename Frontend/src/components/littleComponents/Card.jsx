import React, { useState } from "react";
import del from "../../assets/delete.svg";
import star from "../../assets/Lightning.svg";
import onStar from "../../assets/lightning_on.svg";
import edit from "../../assets/edit.svg";
import copy from "../../assets/copy.svg";
import axios from "axios";
import bgImage from '../../assets/bgGift.png'
import EditReward from "../EditReward";

const Card = ({ reward, id, totalReward, setTotalReward }) => {
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
      const response = await axios.delete(`/api/v2/reward/delete-reward/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        const updatedRewards = totalReward.filter((r) => r._id !== id)
        setTotalReward(updatedRewards);

        console.log(updatedRewards , 'updated')
        console.log("reward deleteed successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // starrred

  const toggleStarred = async () => {
    try {
      const response = await axios.patch(`/api/v2/reward//toggle-reward/${id}`);
      // console.log(response.data.message);

      if (response.status === 200) {
        const toggleReward = response.data.message;
        console.log(toggleReward,'toggleREward')
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
      <div style={{ backgroundImage: `url(${bgImage})` }} className="w-[300px] h-[190px] text-white rounded-2xl bg-[#d9d9d971] flex flex-col justify-between px-[10px] py-[8px] border-[1px] bg-bottom bg-cover border-zinc-500 shadow-md  object-cover ">
        <div className="w-full flex items-center justify-end gap-2">
          <img
            onClick={handleEditCard}
            className="w-[20px] cursor-pointer"
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
            alt=""
          />
        </div>
        <div className="pl-[1vw] w-full overflow-hidden font-hanken-grotesk italic font-normal tracking-[2%]">
          <h3 className="company leading-tight">{reward.title}</h3>
          <div className="flex leading-tight items-center gap-2">
            <h2 className="coupon">{coupon}</h2>
            <img
              onClick={handleClipboard}
              className="w-[17px] cursor-pointer text-white"
              src={copy}
              alt=""
            />
          </div>
          <h4 className="leading-tight">{formattedDate}</h4>
          <p className="tracking-tighter leading-none text-[11px]">
            {reward.description}
          </p>
        </div>
      </div>
      {/* edit part */}
      {isEdit && <EditReward reward={reward} setIsEdit={setIsEdit} totalReward={totalReward} setTotalReward={setTotalReward} />}  
    </>
  );
};

export default Card;
