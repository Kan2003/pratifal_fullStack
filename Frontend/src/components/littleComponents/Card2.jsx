import React, { useState } from "react";
import del from "../../assets/delete.svg";
import star from "../../assets/star_off.svg";
import onStar from "../../assets/star_on.svg";
import edit from "../../assets/edit.svg";
import copy from "../../assets/copy.svg";
import axios from "axios";
import EditReward from "../EditReward";
const API_URl = import.meta.env.VITE_API_URL;

// brand color for the avatar, stable per title
const PALETTE = ["#2563eb", "#f59e0b", "#3E8438", "#111827", "#e23744", "#7c3aed", "#0891b2", "#db2777"];
const brandColor = (title = "") => {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) % 997;
  return PALETTE[h % PALETTE.length];
};

const Card2 = ({ reward, id, totalReward, setTotalReward, index = 0 }) => {
  const coupon = reward.couponCode;
  const date = new Date(reward.expiryDate);

  // 'DD-MM-YYYY' (unchanged)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  // ---- expiry status ----
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exp = new Date(reward.expiryDate);
  exp.setHours(0, 0, 0, 0);
  const d = Math.round((exp - now) / 86400000);

  let status, statusTint, statusColor, expiryText, expiryColor;
  if (d < 0) {
    status = "Expired"; statusTint = "#d83f3418"; statusColor = "#c0392b";
    expiryText = `Expired ${Math.abs(d)}d ago`; expiryColor = "#c0392b";
  } else if (d === 0) {
    status = "Expiring soon"; statusTint = "#ff9f0824"; statusColor = "#b45309";
    expiryText = "Expires today"; expiryColor = "#b45309";
  } else if (d <= 7) {
    status = "Expiring soon"; statusTint = "#ff9f0824"; statusColor = "#b45309";
    expiryText = `Expires in ${d}d`; expiryColor = "#b45309";
  } else {
    status = "Active"; statusTint = "#3e843818"; statusColor = "#2f6b2b";
    expiryText = `Expires in ${d}d`; expiryColor = "#64748b";
  }

  const brand = brandColor(reward.title);
  const initial = (reward.title || "?").trim().charAt(0).toUpperCase();

  // ---- copy to clipboard (unchanged) + feedback ----
  const [copied, setCopied] = useState(false);
  const handleClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  // ---- delete Card (unchanged API) + exit animation ----
  const [removing, setRemoving] = useState(false);
  const handleDelete = async () => {
    setRemoving(true);
    try {
      const response = await axios.delete(`${API_URl}/reward/delete-reward/${id}`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      if (response.status === 200) {
        setTimeout(() => {
          setTotalReward(totalReward.filter((r) => r._id !== id));
        }, 280);
      } else {
        setRemoving(false);
      }
    } catch (error) {
      setRemoving(false);
      console.error(error);
    }
  };

  // ---- starred (unchanged API) + pop animation ----
  const [popped, setPopped] = useState(false);
  const toggleStarred = async () => {
    try {
      const response = await axios.patch(
        `${API_URl}/reward/toggle-reward/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        const toggleReward = response.data.message;
        const updatedRewards = totalReward.map((r) =>
          r._id === id ? { ...r, starred: toggleReward.starred } : r
        );
        setTotalReward(updatedRewards);
        setPopped(true);
        setTimeout(() => setPopped(false), 440);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---- edit card (unchanged) ----
  const [isEdit, setIsEdit] = useState(false);
  const handleEditCard = () => setIsEdit(true);

  return (
    <>
      <div
        style={{
          animation: removing
            ? "cardOut .3s ease forwards"
            : `cardIn .5s ease both ${Math.min(index, 10) * 55}ms`,
        }}
        className="w-[300px] max-w-full bg-white border border-[#e7e9f0] rounded-[20px] p-[18px] relative overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-22px_rgba(16,24,40,0.4)]"
      >
        {/* header */}
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-[11px] flex items-center justify-center text-white font-headlandOne text-[19px]"
            style={{ background: brand, boxShadow: `0 6px 14px -6px ${brand}` }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="capitalize font-headlandOne text-[17px] text-black leading-tight truncate">{reward.title}</h2>
            <span
              className="inline-block mt-1.5 font-hanken-grotesk text-[11px] font-bold tracking-wide px-2.5 py-[3px] rounded-full"
              style={{ background: statusTint, color: statusColor }}
            >
              {status}
            </span>
          </div>
        </div>

        {/* description */}
        <p className="mt-3 text-[13px] leading-normal text-zinc-500 min-h-[38px] font-hanken-grotesk">
          {reward.description}
        </p>

        {/* code chip */}
        <div className="flex items-center justify-between gap-2.5 mt-3 bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] rounded-xl pl-[13px] pr-2.5 py-2">
          <h2 className="coupon font-hanken-grotesk font-extrabold tracking-wide text-[16px] text-black uppercase truncate">{coupon}</h2>
          <button
            onClick={handleClipboard}
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#18181b] text-white font-headlandOne text-[12px] px-3 py-[7px] rounded-[9px] hover:scale-105 hover:bg-[#58B9ED] hover:text-black transition-all duration-200"
          >
            {copied ? "✓ Copied!" : (
              <>
                <img className="w-[13px] invert" src={copy} alt="" /> Copy
              </>
            )}
          </button>
        </div>

        {/* perforated tear line with notches */}
        <div className="relative h-px my-4 -mx-[18px]">
          <div className="absolute inset-x-3.5 inset-y-0 border-t-2 border-dashed border-[#dde1ea]" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#eef1f7]" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#eef1f7]" />
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-2 flex-wrap mt-3">
          <div
            title={formattedDate}
            className="inline-flex items-center gap-1.5 font-hanken-grotesk text-[12.5px] font-semibold"
            style={{ color: expiryColor }}
          >
            <span className="text-[13px]">🗓</span> <span>{expiryText}</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <button
              onClick={toggleStarred}
              title="Star"
              className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-slate-100 transition-colors"
            >
              <img
                style={popped ? { animation: "pop .42s ease" } : undefined}
                className="w-[17px] h-[17px] cursor-pointer"
                src={reward.starred ? onStar : star}
                alt="star"
              />
            </button>
            <button
              onClick={handleEditCard}
              title="Edit"
              className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-slate-100 transition-colors"
            >
              <img className="w-[17px] cursor-pointer" src={edit} alt="edit" />
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-red-50 transition-colors"
            >
              <img className="w-5 cursor-pointer" src={del} alt="delete" />
            </button>
          </div>
        </div>
      </div>

      {/* edit part (unchanged) */}
      {isEdit && (
        <EditReward reward={reward} setIsEdit={setIsEdit} totalReward={totalReward} setTotalReward={setTotalReward} />
      )}
    </>
  );
};

export default Card2;
