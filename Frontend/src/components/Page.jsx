import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Lenis from "lenis";
import axios from "axios";

import SignupButton from "./littleComponents/SignupButton";
import ColorButton from "./littleComponents/ColorButton";
import HorizontalScroll from "./littleComponents/HorizontalScroll";

// --- assets (unchanged paths from your repo) ---
import video from "../assets/Untitled Video.mp4";
import mute from "../assets/mute.png";
import speaker from "../assets/speaker.png";
import logo from "../assets/e351cb12-1980-4409-a8c0-679c37ef00e1-removebg-preview.png";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import starOn from "../assets/star_on.svg";
import starOff from "../assets/star_off.svg";

const API_URl = import.meta.env.VITE_API_URL;

// ---- static content ----
const FEATURES = [
  { icon: "🎟️", tint: "bg-[#002fec14]", title: "Store any coupon", desc: "Codes, gift cards, referral links and loyalty points — every deal kept in one organized place." },
  { icon: "⏰", tint: "bg-[#FF766926]", title: "Never miss an expiry", desc: "Expiry dates sit front and center, so a deal never quietly slips away again." },
  { icon: "⭐", tint: "bg-[#FD6BFF24]", title: "Star your favorites", desc: "Pin the coupons you reach for most and keep them a single tap away." },
  { icon: "📋", tint: "bg-[#49ACB421]", title: "Copy in one tap", desc: "Grab any code straight to your clipboard the moment you hit checkout." },
  { icon: "🔎", tint: "bg-[#3E843818]", title: "Search & filter", desc: "Find any reward by title or code instantly, even with hundreds saved." },
  { icon: "🔒", tint: "bg-[#6ECCFF3d]", title: "Locked & private", desc: "Secure sign-in and an account only you can open keeps your vault yours." },
];

const TRUST = [
  { icon: "💸", title: "Free forever", sub: "No subscriptions, ever." },
  { icon: "♾️", title: "Unlimited rewards", sub: "Save as many as you like." },
  { icon: "🪪", title: "No card required", sub: "Just an email to start." },
  { icon: "🔐", title: "Private & encrypted", sub: "Your vault stays yours." },
];

const FAQS = [
  { q: "Is Pratifal really free?", a: "Yes. Save unlimited coupons and rewards with no payment and no card required — free, forever." },
  { q: "What can I store?", a: "Any coupon code, gift card, referral link, loyalty reward or voucher — each with its own title, expiry date and a short note." },
  { q: "Will I be reminded before a coupon expires?", a: "Every reward shows its expiry date up front and can be starred, so the deals that matter never slip past you." },
  { q: "Is my data secure?", a: "Your account is protected with secure sign-in, and only you can open your vault. Delete your account anytime and everything you saved goes with it." },
  { q: "Do I need to install anything?", a: "No. Pratifal runs right in your browser — sign up and start adding rewards in seconds." },
];

// modern coupon-ticket cards (matches the redesigned dashboard)
const PREVIEW_CARDS = [
  { title: "Flipkart Big Billion", initial: "F", brand: "#2563eb", code: "FLIP500", desc: "₹500 off on orders over ₹2,499 during the sale.", status: "Active", statusTint: "#3e843818", statusColor: "#2f6b2b", expiry: "Expires in 41d", expiryColor: "#64748b", starred: true },
  { title: "Starbucks Rewards", initial: "S", brand: "#3E8438", code: "BREW1FREE", desc: "Buy one grande, get one free before noon.", status: "Expiring soon", statusTint: "#ff9f0824", statusColor: "#b45309", expiry: "Expires in 5d", expiryColor: "#b45309", starred: false },
];

// ---- redesigned reward card (coupon-ticket) ----
const PreviewCard = ({ c }) => (
  <div className="w-[300px] max-w-full bg-white border border-[#e7e9f0] rounded-[20px] p-[18px] relative overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-22px_rgba(16,24,40,0.4)]">
    {/* header */}
    <div className="flex items-start gap-3">
      <div
        className="shrink-0 w-10 h-10 rounded-[11px] flex items-center justify-center text-white font-headlandOne text-[19px]"
        style={{ background: c.brand, boxShadow: `0 6px 14px -6px ${c.brand}` }}
      >
        {c.initial}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-headlandOne text-[17px] text-black leading-tight truncate">{c.title}</h4>
        <span
          className="inline-block mt-1.5 font-hanken-grotesk text-[11px] font-bold tracking-wide px-2.5 py-[3px] rounded-full"
          style={{ background: c.statusTint, color: c.statusColor }}
        >
          {c.status}
        </span>
      </div>
    </div>
    {/* description */}
    <p className="mt-3 text-[13px] leading-normal text-zinc-500 min-h-[38px]">{c.desc}</p>
    {/* code chip */}
    <div className="flex items-center justify-between gap-2.5 mt-3 bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] rounded-xl pl-[13px] pr-2.5 py-2">
      <span className="font-hanken-grotesk font-extrabold tracking-wide text-[16px] text-black uppercase truncate">{c.code}</span>
      <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#18181b] text-white font-headlandOne text-[12px] px-3 py-[7px] rounded-[9px]">Copy</span>
    </div>
    {/* perforated tear line with notches */}
    <div className="relative h-px my-4 -mx-[18px]">
      <div className="absolute inset-x-3.5 inset-y-0 border-t-2 border-dashed border-[#dde1ea]" />
      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#eef1f7]" />
      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#eef1f7]" />
    </div>
    {/* footer */}
    <div className="flex items-center justify-between gap-2 flex-wrap mt-3">
      <div className="inline-flex items-center gap-1.5 font-hanken-grotesk text-[12.5px] font-semibold" style={{ color: c.expiryColor }}>
        <span className="text-[13px]">🗓</span> <span>{c.expiry}</span>
      </div>
      <div className="flex items-center gap-[3px]">
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-slate-100 transition-colors cursor-pointer"><img src={c.starred ? starOn : starOff} className="w-[17px] h-[17px]" alt="star" /></span>
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] text-[15px] text-[#3E8438] hover:bg-[#eaf7ea] transition-colors cursor-pointer">✓</span>
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-slate-100 transition-colors cursor-pointer"><img src={editIcon} className="w-[17px] h-[17px]" alt="edit" /></span>
        <span className="w-8 h-8 inline-flex items-center justify-center rounded-[9px] hover:bg-red-50 transition-colors cursor-pointer"><img src={deleteIcon} className="w-5 h-5" alt="delete" /></span>
      </div>
    </div>
  </div>
);

const Page = ({ handleLogout }) => {
  // ---------- video mute (unchanged behaviour) ----------
  const [muted, setMuted] = useState(true);
  const handleMute = () => setMuted((m) => !m);

  // ---------- FAQ accordion ----------
  const [openFaq, setOpenFaq] = useState(0);

  // ---------- Lenis smooth scroll (unchanged) ----------
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", () => {});
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy && lenis.destroy();
  }, []);

  // ---------- current user + profile (UNCHANGED auth logic) ----------
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await axios.get(`${API_URl}/users/`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(true);
          setProfile(response.data.data.profile);
        }
      } catch (error) {
        // 401 -> try refreshing the access token, then retry
        if (error.response && error.response.status === 401) {
          try {
            const refreshResponse = await axios.post(
              `${API_URl}/users/refresh-accesstoken`,
              {},
              { withCredentials: true }
            );
            if (refreshResponse.status === 200) {
              const newResponse = await axios.get(`${API_URl}/users/`, {
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
    <div className="w-full bg-[#FAFAFA] overflow-x-hidden">
      {/* NAVBAR — keeps login / profile / logout */}
      <Navbar user={user} profile={profile} handleLogout={handleLogout} />

      {/* ================= HERO ================= */}
      <header id="hero" className="w-full flex flex-col items-center text-center gap-5 px-[4vw] pt-28 pb-8 scroll-mt-20">
        <span className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-[7px] font-headlandOne text-[12.5px] text-zinc-600 shadow-sm">
          🎟️ Your personal rewards vault
        </span>
        <h1 className="font-headlandOne text-[32px] md:text-[46px] lg:text-[54px] leading-[1.12] max-w-[16ch] text-black">
          Store All Your Rewards in a Single &amp; Secured Place
        </h1>
        <p className="max-w-[54ch] text-[14px] md:text-[17px] leading-relaxed text-zinc-600 font-hanken-grotesk">
          All your rewards — safely stored, expiry-tracked and starred for easy access whenever you shop.
        </p>
        <SignupButton text="Get Started For Free →" color="bg-[#18181b]" textColor="text-white" />
        <p className="text-[12px] text-zinc-500 font-headlandOne">Save unlimited rewards · No payment needed</p>
      </header>

      {/* ================= VIDEO (kept, with mute toggle) ================= */}
      <div className="px-[2vw] pb-6">
        <div className="bg-white w-full h-[60vh] md:h-[100vh] rounded-2xl overflow-hidden relative border-2 border-zinc-400 shadow-[0_34px_80px_-34px_rgba(0,0,0,0.4)]">
          <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-[#ffffff1a] top-[25px] left-[25px] absolute rounded-[20%] flex items-center justify-center z-20">
            <div className="w-[46px] h-[46px] md:w-[60px] md:h-[60px] bg-[#D9D9D9] rounded-[20%] flex items-center justify-center">
              <img
                onClick={handleMute}
                className="w-[29.5px] h-[29.5px] cursor-pointer"
                src={muted ? mute : speaker}
                alt="toggle sound"
              />
            </div>
          </div>
          <video autoPlay playsInline muted={muted} loop src={video} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-[5vw] py-14 scroll-mt-20">
        <div className="text-center max-w-[720px] mx-auto mb-10 flex flex-col items-center gap-3">
          <span className="inline-flex items-center bg-white border border-zinc-200 rounded-full px-4 py-1.5 font-headlandOne text-[12px] text-zinc-600">Features</span>
          <h2 className="font-headlandOne text-[26px] md:text-[38px] leading-tight text-black">Everything you need to never lose a reward again</h2>
          <p className="text-[14px] md:text-[17px] leading-relaxed text-zinc-600 font-hanken-grotesk">Built for anyone with coupons scattered across emails, screenshots and sticky notes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1180px] mx-auto">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-[#e7e7e7] rounded-[18px] p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_34px_-18px_rgba(0,0,0,0.28)] hover:border-zinc-300">
              <div className={`w-[52px] h-[52px] rounded-[14px] ${f.tint} flex items-center justify-center text-[26px]`}>{f.icon}</div>
              <h3 className="font-headlandOne text-[21px] text-black">{f.title}</h3>
              <p className="text-[15px] leading-relaxed text-zinc-600 font-hanken-grotesk">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECURE / CENTRALIZED / ACCESSIBLE + live dashboard preview ================= */}
      <section className="max-w-[1180px] mx-auto my-10 px-[5vw] flex flex-col md:flex-row gap-11 items-center justify-between">
        <div className="w-full md:w-[44%] flex flex-col gap-5">
          <div className="font-headlandOne text-black">
            <h2 className="text-[18px] md:text-[22px] tracking-wider leading-[1.9]"><span className="text-[44px] md:text-[64px]">S</span>ecure.</h2>
            <h2 className="text-[18px] md:text-[22px] tracking-wider leading-[1.9]"><span className="text-[44px] md:text-[64px]">C</span>entralized.</h2>
            <h2 className="text-[18px] md:text-[22px] tracking-wider leading-[1.9]"><span className="text-[44px] md:text-[64px]">A</span>ccessible.</h2>
          </div>
          <p className="max-w-[48ch] font-hanken-grotesk font-medium text-[15px] md:text-[18px] leading-relaxed text-zinc-700">
            Never miss out on rewards, coupons or points again. Keep everything in one secure place and pull it up
            effortlessly whenever you shop — stay organized, save money, and never let another reward expire. Your
            savings are just a click away.
          </p>
          <SignupButton text="Sign Up for free" color="bg-[#18181b]" textColor="text-white" />
        </div>

        {/* mini dashboard board with the redesigned coupon cards */}
        <div className="w-full md:w-[52%] rounded-[24px] border border-[#cfd8e3] bg-[#eef1f7] p-5 md:p-6">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
            <span className="font-headlandOne text-[15px] text-black">Your rewards</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full font-headlandOne text-[11px] bg-[#18181b] text-white">All 12</span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full font-headlandOne text-[11px] bg-white text-zinc-500 border border-zinc-200">⭐ Starred</span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full font-headlandOne text-[11px] bg-white text-zinc-500 border border-zinc-200">⏳ Expired</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            {PREVIEW_CARDS.map((c) => (
              <PreviewCard key={c.title} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="my-12 px-[5vw] py-8 bg-gradient-to-r from-[#eaf6ff] to-[#f3ecff]">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-3.5">
              <span className="text-[30px]">{t.icon}</span>
              <div>
                <div className="font-headlandOne text-[18px] text-black">{t.title}</div>
                <div className="text-[13.5px] text-zinc-600">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PILL QUOTE (kept, uses ColorButton) ================= */}
      <section className="max-w-[1080px] mx-auto my-14 px-[5vw] flex flex-col items-center gap-7 text-center">
        <p className="font-headlandOne text-[24px] md:text-[46px] leading-[1.45] text-black">
          &ldquo;Don&rsquo;t let your{" "}
          <span className="inline-flex -translate-y-1 md:-translate-y-2"><ColorButton color="bg-[#002fec96] text-white" text="REWARDS 🎉" /></span>{" "}
          slip through the cracks. Pratifal gathers all your rewards in one{" "}
          <span className="inline-flex -translate-y-1 md:-translate-y-2"><ColorButton color="bg-[#49ACB4] text-white" text="SECURE 🔒" /></span>{" "}
          vault. Experience the exhilarating{" "}
          <span className="inline-flex -translate-y-1 md:-translate-y-2"><ColorButton color="bg-[#FD6BFF] text-white" text="FREEDOM 🎉" /></span>{" "}
          of having your deals at your beck and call, ready to elevate your everyday{" "}
          <span className="inline-flex -translate-y-1 md:-translate-y-2"><ColorButton color="bg-[#FF7669] text-white" text="LIFE ❤️" /></span>.&rdquo;
        </p>
        <SignupButton text="Get started" color="bg-[#18181b]" textColor="text-white" />
      </section>

      {/* ================= HOW IT WORKS (your GSAP horizontal scroll) ================= */}
      <section id="how" className="text-center pt-14 pb-2 flex flex-col items-center gap-3 scroll-mt-20">
        <span className="inline-flex items-center bg-white border border-zinc-200 rounded-full px-4 py-1.5 font-headlandOne text-[12px] text-zinc-600">How it works</span>
        <h2 className="font-headlandOne text-[26px] md:text-[38px] text-black">Up and running in three quick steps</h2>
      </section>
      <div className="my-[6vw] w-full hidden lg:block">
        <HorizontalScroll />
      </div>

      {/* ================= FAQ ================= */}
      <section id="faq" className="px-[5vw] py-16 scroll-mt-20">
        <div className="text-center max-w-[720px] mx-auto mb-9 flex flex-col items-center gap-3">
          <span className="inline-flex items-center bg-white border border-zinc-200 rounded-full px-4 py-1.5 font-headlandOne text-[12px] text-zinc-600">FAQ</span>
          <h2 className="font-headlandOne text-[26px] md:text-[38px] text-black">Questions? Answered.</h2>
        </div>
        <div className="max-w-[760px] mx-auto flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="bg-white border border-[#e7e7e7] rounded-[14px] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-[18px] text-left font-headlandOne text-[17px] text-black"
                >
                  {f.q}
                  <span className={`text-[24px] text-[#58B9ED] leading-none transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
                </button>
                {open && (
                  <div className="px-5 pb-[18px] text-[15px] leading-relaxed text-zinc-600 font-hanken-grotesk">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-[5vw] py-[7vw] text-center flex flex-col items-center gap-5 bg-gradient-to-br from-[#002fec] to-[#49ACB4]">
        <h2 className="font-headlandOne text-[28px] md:text-[48px] text-white max-w-[18ch] leading-tight">Ready to declutter your rewards?</h2>
        <p className="text-[#eaf6ff] text-[15px] md:text-[18px] max-w-[48ch] leading-relaxed">
          Join Pratifal and keep every coupon, code and reward in one secure place — free, forever.
        </p>
        <SignupButton text="Get Started For Free →" color="bg-white" textColor="text-black" />
        <p className="text-[#dbeafe] text-[12px] font-headlandOne">Save unlimited rewards · No payment needed</p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0f1115] text-[#cbd5e1] px-[5vw] pt-14 pb-7">
        <div className="max-w-[1180px] mx-auto flex flex-wrap gap-10 justify-between">
          <div className="flex-1 min-w-[260px] max-w-[340px] flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <img src={logo} className="w-10 h-10 object-contain" alt="" />
              <span className="font-headlandOne text-[22px] text-white">PratiFal</span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#94a3b8]">
              Your personal rewards vault. Store, track and redeem every coupon and reward from one secure place.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 min-w-[130px]">
            <span className="font-headlandOne text-[14px] text-white mb-0.5">Product</span>
            <a href="#features" className="text-[#94a3b8] text-[14px] hover:text-white">Features</a>
            <a href="#how" className="text-[#94a3b8] text-[14px] hover:text-white">How it works</a>
            <a href="#faq" className="text-[#94a3b8] text-[14px] hover:text-white">FAQ</a>
          </div>
          <div className="flex flex-col gap-2.5 min-w-[130px]">
            <span className="font-headlandOne text-[14px] text-white mb-0.5">Account</span>
            <a href="/register" className="text-[#94a3b8] text-[14px] hover:text-white">Sign Up</a>
            <a href="/login" className="text-[#94a3b8] text-[14px] hover:text-white">Login</a>
          </div>
          <div className="flex flex-col gap-2.5 min-w-[130px]">
            <span className="font-headlandOne text-[14px] text-white mb-0.5">More</span>
            <a href="https://github.com/Kan2003/pratifal_fullStack" className="text-[#94a3b8] text-[14px] hover:text-white">GitHub</a>
          </div>
        </div>
        <div className="max-w-[1180px] mx-auto mt-7 pt-5 border-t border-[#1e2430] flex flex-wrap gap-2 justify-between text-[12.5px] text-[#64748b]">
          <span>© {new Date().getFullYear()} Pratifal. All rights reserved.</span>
          <span>Made with ❤️ by Kanha Vishwakarma</span>
        </div>
      </footer>
    </div>
  );
};

export default Page;
