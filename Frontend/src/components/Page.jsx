import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Lenis from "lenis";
import SignupButton from "./littleComponents/SignupButton";
import speaker from "../assets/66f2e8b62f0f951eb6f22fb9_Frame.png";
import background from "../assets/background.png";
import video from "../assets/Untitled Video.mp4";
import ColorButton from "./littleComponents/ColorButton";
import axios from "axios";
import HorizontalScroll from "./littleComponents/HorizontalScroll";
const Page = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await axios.get("/api/v2/users/", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(true);
          setProfile(response.data.data.profile);
        }
      } catch (error) {
        // Handle 401 Unauthorized errors (likely due to expired token)
        if (error.response && error.response.status === 401) {
          try {
            // Refresh the access token using refresh token
            const refreshResponse = await axios.post(
              "/api/v2/users/refresh-accesstoken",
              {}, // No need to pass credentials manually, they are in the cookie
              { withCredentials: true } // Ensure refreshToken is sent with the request
            );

            console.log(refreshResponse.data);

            // If refresh is successful, retry fetching user details
            if (refreshResponse.status === 200) {
              const newResponse = await axios.get("/api/v2/users/", {
                withCredentials: true,
              });

              if (newResponse.status === 200) {
                setUser(true);
                setProfile(newResponse.data.data.profile);
              }
            }
          } catch (refreshError) {
            console.log(refreshError);
            setUser(false);
          }
        } else {
          console.log(error);
        }
      }
    };

    userDetails();
  }, []);
  return (
    // style={{ backgroundImage: `url(${background})` }} background image style
    <div className="w-full bg-no-repeat">
      <Navbar user={user} profile={profile} />
      <div className="w-full relative pt-[7vw] ">
        <div className="flex px-[2vw] items-center justify-center flex-col gap-5 py-14">
          <h1 className=" text-[40px] xs:text-[30px] sm:text-[30px] md:text-[40px]  lg:text-[40px] xl:text-[40px] 2xl:text-[40px] text-center font-headlandOne ">
            Store Your All Rewards in A single & Secured Place
          </h1>
          <p className="text-sm xs:text-[12px] sm:text-[12px] md:text-[14px]  lg:text-[14px] xl:text-[14px] 2xl:text-[14px] text-center font-headlandOne font-medium  ">
            All Your Rewards, Safely Stored, Notified, and Starred for Easy
            Access.
          </p>
          <SignupButton
            text="Get Started For Free"
            color="bg-black"
            textColor="text-white"
          />
          <p className="text-[12px] -mt-2 font-headlandOne">
            Save Unlimited rewards | No Payment needed
          </p>
        </div>
        {/* video */}
        <div className="px-[2vw]">
          <div className="bg-white w-full h-[100vh] xs:h-[60vh] sm:h-[70vh] md:h-[100vh]  lg:h-[100vh] xl:h-[100vh] 2xl:h-[100vh] rounded-2xl overflow-hidden relative border-[2px] border-zinc-400">
            <div className="w-[90px] h-[90px] xs:h-[60px] xs:w-[60px] sm:h-[70px] sm:w-[70px] md:h-[90px] md:w-[90px] lg:h-[90px] lg:w-[90px] xl:h-[90px] xl:w-[90px] 2xl:h-[90px] 2xl:w-[90px]  bg-[#ffffff1a]  top-[25px] left-[25px] absolute rounded-[20%] flex items-center justify-center ">
              <div className="w-[60px] h-[60px] xs:h-[40px] xs:w-[40px] sm:h-[50px] sm:w-[50px] md:h-[60px] md:w-[60px] lg:h-[60px] lg:w-[60px] xl:h-[60px] xl:w-[60px] 2xl:h-[60px] 2xl:w-[60px] bg-[#D9D9D9] rounded-[20%] flex items-center justify-center">
                <img
                  className="w-[29.5px] h-[29.5px] cursor-pointer stroke-black z-20"
                  src={speaker}
                  alt=""
                />
              </div>
            </div>
            <video
              autoPlay
              playsInline
              muted
              loop
              src={video}
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
        {/* third section */}
        <div className=" my-[4vw] w-full xs:my-[8vw]  sm:my-[8vw]  md:my-[4vw]  lg:my-[4vw]  xl:my-[4vw]  2xl:my-[4vw]  flex items-center px-[6vw] xs:px-[2vw]  sm:px-[4vw]  md:px-[5vw]  lg:px-[5vw]  xl:px-[6vw]  2xl:px-[6vw] justify-between   xs:flex-col  sm:flex-col  md:flex-row  lg:flex-row  xl:flex-row  2xl:flex-row">
          <div className="w-[40vw] xs:w-full  sm:w-full  md:w-[40vw]  lg:w-[40vw]  xl:w-[40vw]  2xl:w-[40vw]  h-full py-[8vw] flex flex-col items-start gap-6">
            <div className="heading flex flex-col items-start w-full font-headlandOne">
              <h1 className="text-[20px] xs:text-[16px]  sm:text-[16px]  md:text-[18px]  lg:text-[18px]  xl:text-[20px]  2xl:text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px] xs:text-[40px]  sm:text-[45px]  md:text-[50px]  lg:text-[60px]  xl:text-[60px]  2xl:text-[60px]">
                  S
                </span>
                ecure.
              </h1>
              <h1 className="text-[20px] xs:text-[16px]  sm:text-[16px]  md:text-[18px]  lg:text-[18px]  xl:text-[20px]  2xl:text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px] xs:text-[40px]  sm:text-[45px]  md:text-[50px]  lg:text-[60px]  xl:text-[60px]  2xl:text-[60px]">
                  C
                </span>
                entralized.
              </h1>
              <h1 className="text-[20px] xs:text-[16px]  sm:text-[16px]  md:text-[18px]  lg:text-[18px]  xl:text-[20px]  2xl:text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px] xs:text-[40px]  sm:text-[45px]  md:text-[50px]  lg:text-[60px]  xl:text-[60px]  2xl:text-[60px]">
                  A
                </span>
                ccessible.
              </h1>
            </div>
            <div className="w-[80%]  xs:w-full  sm:w-full  md:w-[80%]  lg:w-[80%]  xl:w-[80%] 2xl:w-[80%]">
              <p className="text-[20px] xs:text-[15px]  sm:text-[16px]  md:text-[18px]  lg:text-[20px]  xl:text-[20px]  2xl:text-[20px] font-hanken-grotesk font-medium tracking-normal leading-5 2xl:leading-6 xl:leading-6 ">
                Never miss out on rewards, coupons, or points again! Store
                everything in one secure place and access them effortlessly
                whenever you shop.Our website lets you effortlessly manage your
                rewards, ensuring they are available at your fingertips whenever
                you shop, making saving money simpler and more convenient. Stay
                organized and never let another reward expire—your savings are
                just a click away!
              </p>
            </div>
            <SignupButton
              text="Sign Up for free"
              color="bg-zinc-900"
              textColor="text-white"
            />
          </div>
          <div className="w-[40vw] xs:w-full sm:w-full md:w-[50vw] lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] bg-zinc-200 rounded-2xl h-[555px] xs:h-[350px]  sm:h-[400px]  md:h-[555px]  lg:h-[555px]  xl:h-[555px]  2xl:h-[600px]"></div>
        </div>
        {/* forth section */}
        <div className="my-[4vw] xs:my-[15vw]  sm:my-[15vw]  md:my-[4vw]  lg:my-[4vw]  xl:my-[4vw]  2xl:my-[4vw] xs:px-[2vw]  sm:px-[4vw]  md:px-[5vw]  lg:px-[5vw]  xl:px-[6vw]  2xl:px-[6vw]  px-[2vw] w-full flex flex-col items-center gap-6">
          <h1 className="text-center text-[59px] xs:text-[30px] sm:text-[30px] md:text-[40px]  lg:text-[40px] xl:text-[60px] 2xl:text-[60px] tracking-normal font-headlandOne">
            "Don't let your{" "}
            <div className="inline-flex">
              <span className="-translate-y-3 xs:-translate-y-1  sm:-translate-y-1   md:-translate-y-2  lg:-translate-y-2  xl:-translate-y-3  2xl:-translate-y-3">
                <ColorButton color="bg-[#002fec96]" text="REWARDS 🎉" />
              </span>
            </div>{" "}
            slip through the cracks. Our app Gather all your rewards in one{" "}
            <div className="inline-flex">
              <span className="-translate-y-3 xs:-translate-y-1  sm:-translate-y-1   md:-translate-y-2  lg:-translate-y-2  xl:-translate-y-3  2xl:-translate-y-3">
                <ColorButton color="bg-[#49ACB4]" text="SECURE 🔒" />
              </span>
            </div>{" "}
            , fortress-like vault. Experience the exhilarating{" "}
            <div className="inline-flex">
              <span className="-translate-y-3 xs:-translate-y-1  sm:-translate-y-1   md:-translate-y-2  lg:-translate-y-2  xl:-translate-y-3  2xl:-translate-y-3">
                <ColorButton color="bg-[#FD6BFF]" text="FREEDOM 🎉" />
              </span>
            </div>{" "}
            of having your rewards at your beck and call, ready to elevate your
            everyday{" "}
            <div className="inline-flex">
              <span className="-translate-y-3 xs:-translate-y-1  sm:-translate-y-1   md:-translate-y-2  lg:-translate-y-2  xl:-translate-y-3  2xl:-translate-y-3">
                <ColorButton color="bg-[#FF7669]" text="LIFE ❤️" />
              </span>
            </div>{" "}
            ."
          </h1>
          <div>
            <SignupButton
              text="Get started"
              color="bg-zinc-900"
              textColor="text-white"
            />
          </div>
        </div>

        {/* <div className="w-full ">
          <h1 className="text-center font-Harmattan font-bold text-[30px]">Add your reward & coupons in just two steps and forget about where it on...</h1>
        </div> */}

        <div className="my-[8vw] w-full xs:hidden  sm:hidden  md:hidden  lg:block  xl:block  2xl:block">
          <HorizontalScroll />
        </div>
        <div className="w-full h-screen  "></div>
      </div>
    </div>
  );
};

export default Page;
