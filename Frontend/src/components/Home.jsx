import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../App";

import Card from "./littleComponents/Card";
import axios from "axios";
import CreateReward from "./CreateReward";
import coupon from "../assets/coupon.svg";
const API_URl = import.meta.env.VITE_API_URL;
const Home = () => {
  const { search = "", showCreateForm, setShowCreateForm } = useContext(UserContext);

  if(search === undefined || search === "undefinded"){
    location.reload()
  }

  
  const [totalReward, setTotalReward] = useState([]);

  // console.log(search)

  useEffect(() => {
    const allRewards = async () => {
      try {
        const response = await axios.get(`${API_URl}/reward/`,{
          withCredentials: true, // Include cookies with the request
        });

        setTotalReward(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    allRewards();
  }, []);
  // console.log(totalReward)

  // search functionality

  const filterRewards = useMemo(() => {
    if (!search) return totalReward; // Show all rewards if search is empty

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

  //

  return (
    <>
      <div className="w-full pt-[10vw] sm:pt-[20vw] xs:pt-[25vw] pb-[5vw] md:pt-[15vw] lg:pt-[10vw] xl:pt-[10vw] 2xl:pt-[10vw] px-[2vw] relative ">
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full flex-wrap items-center gap-8 justify-center ">
            {(filterRewards?.length > 0) ? (
            
              filterRewards.map((reward, index) => (
                <Card
                  key={index}
                  reward={reward}
                  id={reward._id}
                  setTotalReward={setTotalReward}
                  totalReward={totalReward}
                />
              ))
            ) : (
              totalReward?.length > 0 ? (
                <div className="col-span-full h-[60vh] flex  items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold font-hanken-grotesk">
                    No results found
                  </p>
                </div>
              </div>
              ) : (
                <div className="col-span-full h-[60vh] flex  items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold font-hanken-grotesk">
                    Add your first Coupon <span>
              <img className="inline-block w-[50px]" src={coupon} alt="" />
            </span>{" "}
                  </p>
                </div>
              </div>
              )
            )}
          </div>
          {showCreateForm && (
            <CreateReward setShowCreateForm={setShowCreateForm} totalReward={totalReward} setTotalReward={setTotalReward} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
