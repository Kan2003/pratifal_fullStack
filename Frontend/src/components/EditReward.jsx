import React, { useEffect, useState } from "react";
import Input from "./littleComponents/Input";
import cross from "../assets/cross.svg";
import axios from "axios";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import TextArea from "./littleComponents/TextArea";
const EditReward = ({ reward, setIsEdit, totalReward, setTotalReward }) => {
  
  const [title, setTitle] = useState(reward.title);
  const [showTitleError, setShowTitleError] = useState(false);

  const [description, setDescription] = useState(reward.description);
  const [showDescriptionError, setShowDescriptionError] = useState(false);

  const [coupon, setCoupon] = useState(reward.couponCode);
  const [showCouponError, setShowCouponError] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [expiryDate, setExpiryDate] = useState(formatDate(reward.expiryDate));
  const [showExpiryDateError, setShowExpiryDateError] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentDate = new Date().setHours(0, 0, 0, 0);

  const handleBlur = (e) => {
    if (e.target.id === "title") {
      setShowTitleError(title.trim() === "");
    } else if (e.target.id === "description") {
      setShowDescriptionError(description.trim() === "");
    } else if (e.target.id === "coupon") {
      setShowCouponError(coupon.trim() === "");
    } else if (e.target.id === "expiryDate") {
      const selectedDate = new Date(expiryDate).setHours(0, 0, 0, 0);

      setShowExpiryDateError(
        expiryDate.trim() === "" || selectedDate < currentDate
      );
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "title") {
      const value = e.target.value;
      setTitle(value);
      if (value.trim() !== "") {
        setShowTitleError(false);
      }
    } else if (e.target.id === "description") {
      const value = e.target.value;
      setDescription(value);
      if (value.trim() !== "") {
        setShowDescriptionError(false);
      }
    } else if (e.target.id === "coupon") {
      const value = e.target.value;
      setCoupon(value);
      if (value.trim() !== "") {
        setShowCouponError(false);
      }
    } else if (e.target.id === "expiryDate") {
      const value = e.target.value;
      setExpiryDate(value);
      const selectedDate = new Date(value).setHours(0, 0, 0, 0);
      if (value.trim() !== "" && selectedDate >= currentDate) {
        setShowExpiryDateError(false);
      } else {
        setShowExpiryDateError(true);
      }
    }
  };

  //   Edit a reward
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/api/v2/reward/update-reward/${reward._id}`,
        {
          title,
          description,
          couponCode: coupon,
          expiryDate: new Date(expiryDate),
        }
      );
      if (response.status === 200) {
        setSuccess("Reward updated successfully");
        setTotalReward(
          totalReward.map((r) =>
            r._id === reward._id ? response.data.message : r
          )
        );
      }
      setIsEdit(false);
    } catch (error) {
      const status = error.response.status;
      console.log(status);
      console.log(error);

      setTitle("");
      setDescription("");
      setCoupon("");
      setExpiryDate("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[20%] backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg px-6 py-3 w-[30vw]   xs:w-[80%] sm:w-[50vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
          <div className="flex items-center justify-between">
            <h1 className=" text-[20px] font-Harmattan">Edit Reward</h1>
            <img
              onClick={() => setIsEdit(false)}
              className="w-[45px] h-[45px] cursor-pointer"
              src={cross}
              alt=""
            />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
              >
                Title
              </label>
              <Input
                error={showTitleError}
                id="title"
                type="text"
                placeholder="title"
                value={title}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="Title is required."
              />
            </div>

            <div className="mt-2">
            <label
                htmlFor="description"
                className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
              >
                Description
              </label>
              <TextArea
                error={showDescriptionError}
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="Description is required."
              />
              {/* <textarea className="w-full h-[30px]" maxLength={100} name="" id=""></textarea> */}
            </div>

            <div className="mt-2">
              <label
                htmlFor="coupon"
                className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
              >
                Coupon
              </label>
              <Input
                error={showCouponError}
                id="coupon"
                type="text"
                placeholder="Coupon"
                value={coupon}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="Coupon Code is required."
              />
            </div>

            <div className="mt-2">
              <label
                htmlFor="expiryDate"
                className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
              >
                Expiry Date : MM/DD/YYYY
              </label>
              <Input
                error={showExpiryDateError}
                id="expiryDate"
                type="date" // Correcting to lowercase "date"
                placeholder="expiry date"
                value={expiryDate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                text="Expiry Date is required."
              />
            </div>

            <button
              className="w-full text-white text-[15px] tracking-wide py-2 rounded-lg bg-[#58B9ED] font-headlandOne mt-4"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditReward;
