import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RagisterLoginLayout from "./littleComponents/RagisterLoginLayout";
import Input from "./littleComponents/Input";
import cross from "../assets/cross-mark-svgrepo-com.svg";
import check from "../assets/check-svgrepo-com.svg";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import logo from "../assets/logo.png";
const API_URl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // customize error handling
  const [showFullnameError, setShowFullnameError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  // const [fullText, setFullText] = useState("Fullname is required.");
  // const [userNameText, setUsernameText] = useState("Username is required.");
  const [emailText, setEmailText] = useState("Email is required.");
  const [passwordText, setPasswordText] = useState("Password is required.");
  // password Icon
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

  // const isLoggedIn = Boolean(localStorage.getItem("isAuthenticated")); // Replace with your authentication logic
  // console.log(isLoggedIn)
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submission");
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
    <div className="w-full h-screen bg-white flex   xs:pt-[10vw] sm:pt-[5vw] md:pt-[2vw] lg:pt-0 xs:flex-col md:flex-row items-center justify-center xs:justify-around relative">
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="fixed w-full bg-slate-50 top-0 left-0 flex pl-3 justify-start items-center">
        <img className="w-[50px] h-[50px]" src={logo} alt="" />

        <Link
          className="text-black text-2xl xs:text-xl md:text-2xl font-headlandOne"
          to="/"
        >
          Pratifal
        </Link>
      </div>
      <RagisterLoginLayout />
      <div className="w-[50vw] xs:w-full sm:w-[80%] md:w-[50vw] h-full flex items-start flex-col pt-[15vw] xs:pt-[0vw]    md:pt-[25vw] lg:pt-[15vw] font-headlandOne  px-[8vw] xs:px-[5vw]">
        
        <form className="w-full h-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <label
              htmlFor="fullname"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
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
              htmlFor="username"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
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
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              error={showEmailError}
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text={emailText}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              Password <span className="text-red-500">*</span>
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
            className={`w-full text-center  text-[14px] py-2 transition-all duration-300 ease-in-out rounded-lg ${
              buttonError ? "bg-[#58B9ED]" : "bg-[#58b9ed54] cursor-not-allowed"
            } `}
            type="submit"
            disabled={!buttonError}
          >
            Create Your Account
          </button>
          <h3 className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link className="text-[#58B9ED] underline" to="/login">
              Log In
            </Link>{" "}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Register;
