import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./littleComponents/Input";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import logo2 from "../assets/e351cb12-1980-4409-a8c0-679c37ef00e1-removebg-preview.png";
const API_URl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // customize error handling (unchanged)
  const [showFullnameError, setShowFullnameError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [emailText, setEmailText] = useState("Email is required.");
  const [passwordText, setPasswordText] = useState("Password is required.");
  // password Icon (unchanged)
  const [passwordIcon, setPasswordIcon] = useState(false);

  const buttonError =
    !showEmailError &&
    !showPasswordError &&
    !showFullnameError &&
    !showUsernameError &&
    fullName &&
    name &&
    password.length > 8 &&
    email;

  const handleBlur = (e) => {
    if (e.target.id === "fullname") {
      setShowFullnameError(fullName.trim() === "");
    } else if (e.target.id === "name") {
      setShowUsernameError(name.trim() === "");
    } else if (e.target.id === "email") {
      if (email.trim() === "") {
        setEmailText("Email is Required");
        setShowEmailError(true);
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        setEmailText("enter a vaild Email.");
        setShowEmailError(true);
      }
    } else if (e.target.id === "password") {
      if (password.trim() === "") {
        setPasswordText("Password is required.");
        setShowPasswordError(true);
      } else if (e.target.value.length < 8) {
        setPasswordText("Password should be at least 8 characters long.");
        setShowPasswordError(true);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "fullname") {
      const value = e.target.value;
      setFullName(value);
      if (value.trim() !== "") {
        setShowFullnameError(false);
      }
    } else if (e.target.id === "name") {
      const value = e.target.value;
      setName(value);
      if (value.trim() !== "") {
        setShowUsernameError(false);
      }
    } else if (e.target.id === "email") {
      const value = e.target.value;
      setEmail(value);
      if (value.trim() !== "") {
        setShowEmailError(false);
      }
    } else if (e.target.id === "password") {
      const value = e.target.value;
      setPassword(value);
      if (value.trim() !== "") {
        setPasswordIcon(true);
        setShowPasswordError(false);
      } else {
        setPasswordIcon(false);
        setShowPasswordError(false);
      }
    }
  };

  const navigate = useNavigate();

  // register (unchanged API — note: /users/ragister matches the backend route)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URl}/users/ragister`, {
        username: name,
        email,
        password,
        fullname: fullName,
      });
      setSuccess("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setFullName("");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const status = error.response.status;
      if (status === 500) {
        setError("Internal Server Error, Please try again later.");
      } else if (status === 400) {
        setError("userName & Email already registered");
      }
      setName("");
      setEmail("");
      setPassword("");
      setFullName("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex xs:flex-col md:flex-row relative">
      <style>{`
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes floaty2{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-9px) rotate(-5deg)}}
      `}</style>
      {error && <Error error={error} />}
      {success && <Success success={success} />}

      {/* fixed brand bar (kept) */}
      <div className="fixed w-full top-0 left-0 flex pl-3 py-1 justify-start items-center z-20 md:bg-transparent bg-slate-50 md:shadow-none shadow-sm">
        <img className="w-[46px] h-[46px] object-contain" src={logo2} alt="" />
        <Link
          className="text-black text-2xl xs:text-xl md:text-2xl font-headlandOne"
          to="/"
        >
          Pratifal
        </Link>
      </div>

      {/* ===== left brand panel ===== */}
      <div className="xs:hidden md:flex w-[46vw] min-h-screen bg-gradient-to-br from-[#002fec] to-[#49ACB4] flex-col justify-center px-[4vw] py-16 relative overflow-hidden">
        <div className="flex flex-col gap-5 max-w-[440px] relative z-10">
          <span className="self-start inline-flex items-center gap-2 bg-white/15 border border-white/40 rounded-full px-4 py-[7px] font-headlandOne text-[12px] text-white">
            🎟️ Your personal rewards vault
          </span>
          <h1 className="font-headlandOne text-white text-[34px] lg:text-[42px] leading-[1.15]">
            Never lose a reward again
          </h1>
          <p className="text-[#eaf6ff] text-[15px] leading-relaxed font-hanken-grotesk max-w-[42ch]">
            One secure place for every coupon, code and loyalty reward — with
            expiry dates tracked so deals never slip away.
          </p>

          {/* steps */}
          <div className="flex flex-col gap-3 mt-2 font-hanken-grotesk text-white text-[14.5px]">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-headlandOne text-[12px]">1</span>
              Create your free account
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-headlandOne text-[12px]">2</span>
              Add your coupons &amp; rewards
            </div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-headlandOne text-[12px]">3</span>
              Copy &amp; redeem at checkout
            </div>
          </div>

          <div className="flex gap-5 mt-3 text-white/90 font-headlandOne text-[12px]">
            <span>💸 Free forever</span>
            <span>🪪 No card required</span>
            <span>🔐 Private</span>
          </div>
        </div>
        <span
          style={{ animation: "floaty2 6s ease-in-out infinite" }}
          className="absolute top-16 right-10 font-Harmattan font-bold text-[18px] text-white bg-[#FD6BFF] px-4 py-1 rounded-full shadow-lg z-10"
        >
          FREEDOM 🎉
        </span>
        <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full bg-white/10" />
        <div className="absolute -top-16 -right-16 w-[220px] h-[220px] rounded-full bg-white/10" />
      </div>

      {/* ===== right form panel ===== */}
      <div className="flex-1 min-h-screen flex items-center justify-center px-[6vw] xs:px-[6vw] xs:pt-[22vw] sm:pt-[14vw] md:pt-0 py-10">
        <div className="w-full max-w-[440px] bg-white border border-[#e7e9f0] rounded-[20px] shadow-[0_20px_50px_-30px_rgba(16,24,40,0.35)] px-8 py-8 xs:px-6">
          <h2 className="font-headlandOne text-[26px] text-black">Create Your Account</h2>
          <p className="text-[14px] text-slate-500 font-hanken-grotesk mt-1 mb-5">
            Free forever. No card needed — just an email.
          </p>

          <form className="w-full font-headlandOne" onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="fullname"
                className="block text-[14px] leading-none font-headlandOne text-slate-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                error={showFullnameError}
                id="fullname"
                type="text"
                placeholder="Fullname"
                value={fullName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="FullName should not be empty."
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-[14px] leading-none font-headlandOne text-slate-700 mb-1"
              >
                User Name <span className="text-red-500">*</span>
              </label>
              <Input
                error={showUsernameError}
                id="name"
                type="text"
                placeholder="Username"
                value={name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="Username should not be empty"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-[14px] leading-none font-headlandOne text-slate-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                error={showEmailError}
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text={emailText}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-[14px] leading-none font-headlandOne text-slate-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                error={showPasswordError}
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text={passwordText}
                passwordCheck={true}
                passwordIcon={passwordIcon}
              />
            </div>

            <button
              className={`w-full text-center text-[14px] py-3 mt-2 transition-all duration-300 ease-in-out rounded-xl font-headlandOne ${
                buttonError
                  ? "bg-[#18181b] text-white hover:bg-[#58B9ED] hover:text-black"
                  : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!buttonError}
            >
              Create Your Account →
            </button>
            <h3 className="text-sm text-center mt-4 font-hanken-grotesk text-slate-600">
              Already have an account?{" "}
              <Link className="text-[#2a90d6] underline" to="/login">
                Log In
              </Link>{" "}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
