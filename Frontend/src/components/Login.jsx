import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RagisterLoginLayout from "./littleComponents/RagisterLoginLayout";
import Input from "./littleComponents/Input";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // custyomize error message
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const [emailText, setEmailText] = useState("Email is required.");
  const [passwordText, setPasswordText] = useState("Password is required.");

  // password Icon
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

  // const isLoggedIn = Boolean(localStorage.getItem("isAuthenticated")); // Replace with your authentication logic
  // console.log(isLoggedIn)
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post("/api/v2/users/login", {
        email,
        password,
      });

      if (Response.data.success) {
        // Assuming success response from the API
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
    <div className="w-full h-screen flex items-center justify-center relative">
      {error && <Error error={error} />}
      {success && <Success success={success} />}

      <RagisterLoginLayout />
      <div className="w-[50vw] h-full flex items-start flex-col pt-[15vw] font-headlandOne px-[8vw]">
        <h1>Logo</h1>
        <form className="w-full h-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              Email
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
              htmlFor="title"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
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
            className={`w-full text-center  text-[14px] py-2 transition-all duration-300 ease-in-out rounded-lg ${
              buttonError ? "bg-[#58B9ED]" : "bg-[#58b9ed54] cursor-not-allowed"
            } `}
            type="submit"
            disabled={!buttonError}
          >
            Sign In
          </button>
          <h3 className="text-sm text-center mt-2">
            Don't have an account{" "}
            <Link className="text-[#58B9ED] underline" to="/register">
              sign up with Email
            </Link>{" "}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
