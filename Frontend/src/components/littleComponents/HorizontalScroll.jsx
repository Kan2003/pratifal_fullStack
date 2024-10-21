import React, { useEffect, useRef } from "react";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rocket from "../../assets/rocket.svg";
import coupon from "../../assets/coupon.svg";
import SignupButton from "./SignupButton";
// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Convert the sections to an array
    const sections = gsap.utils.toArray(sectionsRef.current);

    // GSAP animation setup for horizontal scrolling
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: Power4,
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 2,
        // snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current.offsetWidth,
      },
    });

    // Cleanup function to kill all ScrollTriggers when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
    className=""
      ref={containerRef}
      style={{
        display: "flex",
        overflowX: "hidden",
        width: "99.6vw",
        flexWrap: "nowrap",
      }}
    >
      {/* Three slides defined directly */}
      <div
        className="panel relative"
        ref={(el) => (sectionsRef.current[0] = el)}
        style={{
          minWidth: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "white",
          backgroundColor: "#002fec96", // Color for Slide 1
        }}
      >
        <div className="w-full flex flex-col items-center justify-center gap-3">
        <div>
        <h1 className="font-Harmattan font-bold text-[100px] lg:text-[80px] xl:text-[100px] 2xl:text-[100px] text-center leading-[80%]">
            Get Started
          </h1>
          <h1 className="font-Harmattan font-bold text-[100px]  lg:text-[80px] xl:text-[100px] 2xl:text-[100px] text-center leading-[80%]">
            in just two quick steps !
          </h1>
        </div>
          <SignupButton
            text="SignUp Now"
            color="bg-zinc-900"
            textColor="text-white"
          />
        </div>
      </div>

      <div
        className="panel relative"
        ref={(el) => (sectionsRef.current[1] = el)}
        style={{
          minWidth: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "white",
          backgroundColor: "#002fec96", // Color for Slide 2
        }}
      >
        <div className="image w-[20rem] lg:w-[15rem] lg:h-[15rem] h-[20rem] xl:w-[20rem] xl:h-[20rem] 2xl:w-[20rem] 2xl:h-[20rem] z-30 overflow-hidden -translate-y-1/2  absolute top-1/2 left-0 -translate-x-1/2 rounded-full">
          <img
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dpav8ilgm/image/upload/v1725884642/vpfcwvvhqiuhqener9of.jpg"
            alt=""
          />
        </div>
        <h1 className="absolute text-black translate-y-[722%] lg:translate-y-[550%] xl:translate-y-[722%]  2xl:translate-y-[722%]   font-Economica font-bold tracking-wide text-[15px] top-1/2 left-0 -translate-x-1/2">
          Hey , I’m Kanha Vishwakarma.....
        </h1>
        <div className="w-[300px] absolute top-[20%] left-[20%]">
          <p className="text-[16px] lg:text-[13px] xl:text-[16px] 2xl:text-[16px] font-Economica tracking-wide text-black font-bold">
            {" "}
            <span className="text-white">"</span> Your Deals, Your Way. Store
            coupons and rewards securely in one place. Easy to find, easy to
            redeem . <span className="text-white">"</span>{" "}
          </p>
        </div>
        <div className="w-full text-center flex items-center justify-center">
          <h2 className="w-[50%] font-Harmattan font-bold text-[80px]  lg:text-[60px] xl:text-[80px] 2xl:text-[80px] leading-[90%]">
            After Creating Account just add your coupon , rewards and save it.
          </h2>
        </div>
        <div className="image w-[20rem] h-[20rem] z-30 overflow-hidden translate-y-1/2  absolute bottom-[30%] right-0 translate-x-1/2 rounded-full">
          <img className="w-full h-full object-cover" src={rocket} alt="" />
        </div>
      </div>

      <div
        className="panel"
        ref={(el) => (sectionsRef.current[2] = el)}
        style={{
          minWidth: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "white",
          backgroundColor: "#002fec96", // Color for Slide 3
        }}
      >
        <div className="w-full text-center flex items-center justify-center">
          <h2 className="w-[52%] font-Harmattan font-bold text-[80px] lg:text-[60px] xl:text-[80px] 2xl:text-[80px] leading-[90%]">
            Now freely you can add your rewards{" "}
            <span>
              <img className="inline-block w-[70px] lg:w-[60px] xl:w-[70px] 2xl:w-[70px]" src={coupon} alt="" />
            </span>{" "}
            <br />
            and access in it anytime.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
