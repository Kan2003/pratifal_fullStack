import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./littleComponents/Input";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import logo2 from "../assets/e351cb12-1980-4409-a8c0-679c37ef00e1-removebg-preview.png";
const API_URl = import.meta.env.VITE_API_URL;

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // customize error message (unchanged)
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [emailText, setEmailText] = useState("Email is required.");
  const [passwordText, setPasswordText] = useState("Password is required.");

  // password Icon (unchanged)
  const [passwordIcon, setPasswordIcon] = useState(false);

  const buttonError =
    !showEmailError && !showPasswordError && password.length > 8 && email;

  const handleBlur = (e) => {
    if (e.target.id === "email") {
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
    if (e.target.id === "email") {
      const value = e.target.value;
      setEmail(value);
      if (value.trim() !== "") {
        setShowEmailError(false);
      }
    } else if (e.target.id === "password") {
      const value = e.target.value;
      setPassword(value);
      if (value.trim() !== "") {
        setShowPasswordError(false);
        setPasswordIcon(true);
      } else {
        setPasswordIcon(false);
      }
    }
  };

  const navigate = useNavigate();

  // login (unchanged API + auth flow)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await axios.post(
        `${API_URl}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (Response.data.success) {
        setSuccess("Login successful!");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      if (status === 500) {
        setError("Internal Server Error, Please try again later.");
      } else if (status === 401) {
        setError("Invalid credentials");
      } else if (status === 404) {
        setError("User not found");
      }
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
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
            Welcome back to your vault
          </h1>
          <p className="text-[#eaf6ff] text-[15px] leading-relaxed font-hanken-grotesk max-w-[42ch]">
            Every coupon, code and reward — right where you left them. Sign in
            and pick up the savings.
          </p>

          {/* mini coupon-ticket card */}
          <div
            style={{ animation: "floaty 6s ease-in-out infinite" }}
            className="mt-4 w-[300px] bg-white rounded-[20px] p-[18px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-[11px] bg-[#2563eb] flex items-center justify-center text-white font-headlandOne text-[19px] shadow-[0_6px_14px_-6px_#2563eb]">
                F
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-headlandOne text-[17px] text-black leading-tight truncate">
                  Flipkart Big Billion
                </h4>
                <span className="inline-block mt-1.5 font-hanken-grotesk text-[11px] font-bold tracking-wide px-2.5 py-[3px] rounded-full bg-[#3e843818] text-[#2f6b2b]">
                  Active
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2.5 mt-3 bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] rounded-xl pl-[13px] pr-2.5 py-2">
              <span className="font-hanken-grotesk font-extrabold tracking-wide text-[15px] text-black uppercase">
                FLIP500
              </span>
              <span className="shrink-0 bg-[#18181b] text-white font-headlandOne text-[11px] px-3 py-[6px] rounded-[9px]">
                Copy
              </span>
            </div>
          </div>

          <div className="flex gap-5 mt-2 text-white/90 font-headlandOne text-[12px]">
            <span>💸 Free forever</span>
            <span>♾️ Unlimited rewards</span>
            <span>🔐 Private</span>
          </div>
        </div>
        <span
          style={{ animation: "floaty2 6s ease-in-out infinite" }}
          className="absolute top-16 right-10 font-Harmattan font-bold text-[18px] text-white bg-[#49ACB4] px-4 py-1 rounded-full shadow-lg z-10"
        >
          SECURE 🔒
        </span>
        <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full bg-white/10" />
        <div className="absolute -top-16 -right-16 w-[220px] h-[220px] rounded-full bg-white/10" />
      </div>

      {/* ===== right form panel ===== */}
      <div className="flex-1 min-h-screen flex items-center justify-center px-[6vw] xs:px-[6vw] xs:pt-[22vw] sm:pt-[14vw] md:pt-0">
        <div className="w-full max-w-[420px] bg-white border border-[#e7e9f0] rounded-[20px] shadow-[0_20px_50px_-30px_rgba(16,24,40,0.35)] px-8 py-9 xs:px-6">
          <h2 className="font-headlandOne text-[26px] text-black">Sign In</h2>
          <p className="text-[14px] text-slate-500 font-hanken-grotesk mt-1 mb-6">
            Good to see you again. Your rewards are waiting.
          </p>

          <form className="w-full font-headlandOne" onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-[14px] leading-none font-headlandOne text-slate-700 mb-1"
              >
                Email
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
                Password
              </label>
              <Input
                error={showPasswordError}
                id="password"
                type="password"
                placeholder="Password"
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
              Sign In →
            </button>
            <h3 className="text-sm text-center mt-4 font-hanken-grotesk text-slate-600">
              Don't have an account{" "}
              <Link className="text-[#2a90d6] underline" to="/register">
                sign up with Email
              </Link>{" "}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
