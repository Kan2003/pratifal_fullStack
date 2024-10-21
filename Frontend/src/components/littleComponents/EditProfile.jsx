import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import Input from "./Input";
import axios from "axios";

const EditProfile = ({ setError, setSuccess }) => {
  const { setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  //   const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");

  const [showFullnameError, setShowFullnameError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const handleBlur = (e) => {
    if (e.target.id === "fullname") {
      setShowFullnameError(fullName.trim() === "");
    } else if (e.target.id === "name") {
      setShowUsernameError(name.trim() === "");
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
    }
  };
  const buttonError =
    !showFullnameError && !showUsernameError && fullName && name;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submission");
    try {
      const response = await axios.patch("/api/v2/users/update-details", {
        username: name,
        fullname: fullName,
      });
      // console.log(response.data.data)
      setUser(response.data.data);
      if (response.status === 404) {
        console.log(404);
        setError("server error");
      }
      setSuccess("User Updated successful!");
      setName("");
      setFullName("");
      setError("");
    } catch (error) {
      // console.log(error.status , 'error');
      const status = error.status;
      if (error.status == 404) {
        setError("server error");
      }
      if (status === 400) {
        setError("userName & Email already registered");
      }
      setName("");
      setFullName("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="bg-slate-100 w-[55%]  px-4 py-2 rounded-lg">
      <h1 className="font-Harmattan text-[30px] opacity-[40%]">Edit Profile</h1>
      <form className="w-[80%] py-[2vw] px-[5vw]" onSubmit={handleSubmit}>
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

        <button
          className={`w-full text-center  text-[14px] py-2 transition-all duration-300 ease-in-out rounded-lg ${
            buttonError ? "bg-[#58B9ED]" : "bg-[#58b9ed54] cursor-not-allowed"
          } `}
          type="submit"
          disabled={!buttonError}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
