import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import CreateReward from "./CreateReward";
import coupon from "../assets/coupon.svg";
import Card2 from "./littleComponents/Card2";
const API_URl = import.meta.env.VITE_API_URL;

const Home = () => {
  const { search = "", showCreateForm, setShowCreateForm } = useContext(UserContext);

  if (search === undefined || search === "undefinded") {
    location.reload();
  }

  const [totalReward, setTotalReward] = useState([]);

  // fetch all rewards (unchanged)
  useEffect(() => {
    const allRewards = async () => {
      try {
        const response = await axios.get(`${API_URl}/reward/`, {
          withCredentials: true, // Include cookies with the request
        });
        setTotalReward(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    allRewards();
  }, []);

  // search functionality (unchanged)
  const filterRewards = useMemo(() => {
    if (!search) return totalReward;
    return totalReward.filter((reward) => {
      const couponCodeMatch = reward?.couponCode
        ?.toLowerCase()
        ?.includes(search?.toLowerCase());
      const titleMatch = reward?.title
        ?.toLowerCase()
        ?.includes(search?.toLowerCase());
      return couponCodeMatch || titleMatch;
    });
  }, [totalReward, search]);

  // ---- NEW: expiry helpers + filter tabs + stats (client-side only) ----
  const daysLeft = (d) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const e = new Date(d);
    e.setHours(0, 0, 0, 0);
    return Math.round((e - now) / 86400000);
  };

  const [activeTab, setActiveTab] = useState("all"); // all | starred | expired

  const stats = useMemo(() => {
    const R = totalReward || [];
    return {
      total: R.length,
      starred: R.filter((r) => r?.starred).length,
      soon: R.filter((r) => daysLeft(r?.expiryDate) >= 0 && daysLeft(r?.expiryDate) <= 7).length,
      expired: R.filter((r) => daysLeft(r?.expiryDate) < 0).length,
    };
  }, [totalReward]);

  const visibleRewards = useMemo(() => {
    let list = filterRewards || [];
    if (activeTab === "starred") list = list.filter((r) => r?.starred);
    else if (activeTab === "expired") list = list.filter((r) => daysLeft(r?.expiryDate) < 0);
    return list;
  }, [filterRewards, activeTab]);

  const tabClass = (tab) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-full font-headlandOne text-[13px] cursor-pointer transition-all duration-200 border ${
      activeTab === tab
        ? "bg-[#18181b] text-white border-[#18181b]"
        : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
    }`;

  const STATS = [
    { label: "Total rewards", value: stats.total, icon: "🎟️", tint: "bg-[#002fec14]" },
    { label: "Starred", value: stats.starred, icon: "⭐", tint: "bg-[#FD6BFF24]" },
    { label: "Expiring soon", value: stats.soon, icon: "⏰", tint: "bg-[#ff9f0824]" },
    { label: "Expired", value: stats.expired, icon: "⏳", tint: "bg-[#d83f3418]" },
  ];

  return (
    <>
      {/* animations used by the dashboard + cards */}
      <style>{`
        @keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
        @keyframes cardOut{to{opacity:0;transform:translateY(-8px) scale(.95)}}
        @keyframes pop{0%{transform:scale(1)}40%{transform:scale(1.45)}70%{transform:scale(.9)}100%{transform:scale(1)}}
        @keyframes modalIn{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      `}</style>

      <div className="w-full min-h-screen bg-[#eef1f7] pt-[10vw] sm:pt-[20vw] xs:pt-[25vw] pb-[5vw] md:pt-[15vw] lg:pt-[8vw] xl:pt-[7vw] 2xl:pt-[6vw] px-[3vw] relative">
        <div className="max-w-[1240px] mx-auto">
          {/* ---- header ---- */}
          <div className="mb-6">
            <h1 className="font-headlandOne text-[26px] md:text-[34px] text-black">Your rewards</h1>
            <p className="mt-1 text-[15px] text-slate-500 font-hanken-grotesk">
              You have <strong className="text-black">{stats.total}</strong> rewards safely stored. Keep saving.
            </p>
          </div>

          {/* ---- stats tiles ---- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white border border-[#e7e9f0] rounded-2xl px-5 py-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-500 font-semibold font-hanken-grotesk">{s.label}</span>
                  <span className={`w-[34px] h-[34px] rounded-[10px] ${s.tint} flex items-center justify-center text-[17px]`}>{s.icon}</span>
                </div>
                <div className="font-headlandOne text-[30px] leading-none text-black">{s.value}</div>
              </div>
            ))}
          </div>

          {/* ---- filter tabs ---- */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className={tabClass("all")} onClick={() => setActiveTab("all")}>
              All <span className="opacity-70">{stats.total}</span>
            </button>
            <button className={tabClass("starred")} onClick={() => setActiveTab("starred")}>
              ⭐ Starred <span className="opacity-70">{stats.starred}</span>
            </button>
            <button className={tabClass("expired")} onClick={() => setActiveTab("expired")}>
              ⏳ Expired <span className="opacity-70">{stats.expired}</span>
            </button>
          </div>

          {/* ---- cards grid ---- */}
          <div className="w-full flex items-center justify-center">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
              {visibleRewards?.length > 0 ? (
                visibleRewards.map((reward, index) => (
                  <Card2
                    key={reward._id || index}
                    reward={reward}
                    id={reward._id}
                    index={index}
                    setTotalReward={setTotalReward}
                    totalReward={totalReward}
                  />
                ))
              ) : totalReward?.length > 0 ? (
                <div className="col-span-full h-[50vh] flex items-center justify-center">
                  <div className="text-center flex flex-col items-center gap-3">
                    <img className="w-[60px] opacity-80" style={{ animation: "floaty 5s ease-in-out infinite" }} src={coupon} alt="" />
                    <p className="text-lg font-semibold font-hanken-grotesk">
                      {search
                        ? "No results found"
                        : activeTab === "starred"
                        ? "No starred rewards yet — tap the star on any card."
                        : activeTab === "expired"
                        ? "No expired rewards. Nice!"
                        : "No results found"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="col-span-full h-[50vh] flex items-center justify-center">
                  <div className="text-center flex flex-col items-center gap-3">
                    <img className="w-[60px]" style={{ animation: "floaty 5s ease-in-out infinite" }} src={coupon} alt="" />
                    <p className="text-lg font-semibold font-hanken-grotesk">Add your first Coupon</p>
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="mt-1 inline-flex items-center gap-2 bg-[#18181b] text-white font-headlandOne text-[13px] px-6 py-3 rounded-full hover:bg-[#58B9ED] hover:text-black transition-all duration-300"
                    >
                      + Create Reward
                    </button>
                  </div>
                </div>
              )}
            </div>

            {showCreateForm && (
              <CreateReward
                setShowCreateForm={setShowCreateForm}
                totalReward={totalReward}
                setTotalReward={setTotalReward}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
