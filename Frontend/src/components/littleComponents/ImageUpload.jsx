import axios from "axios";
import React, { useState } from "react";
import Error from "./Error";
import Success from "./Success";
import cross from "../../assets/cross.svg";

const ImageUpload = ({ setImageUpload, user, setUser }) => {
  // console.log(user)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    console.log(file);
    setPreviewUrl(URL.createObjectURL(file));
    if (file) {
      const formData = new FormData();
      formData.append("profile", file);

      try {
        // Make API call to upload the image
        const response = await axios.patch(
          "https://backend-reward.onrender.com/api/v2/users/update-profile",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        if (response.status === 200) {
          console.log(response.data.data.profile);
          setSuccess("Profile image updated successfully");
          console.log("succcessfully updated profile image");

          const updatedUser = response.data.data;
          setUser(updatedUser);
          setTimeout(() => {
            setImageUpload(false);
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        setError("Error uploading profile image");
      }
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-[10%] backdrop-blur-sm">
        <img className="absolute right-2 top-14 cursor-pointer" onClick={() => setImageUpload(false)} src={cross} alt="" />
        <input
          // ref={fileInputRef}
          type="file"
          accept="image/*"
          // style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>

        {/* we have to edit it */}
      {/* <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <div className="mb-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-lg border-2 border-gray-300"
            />
          ) : (
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No Image Selected</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        {/* <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        disabled={!selectedImage}
      >
        Upload
      </button>
      </div> */}
    </>
  );
};

export default ImageUpload;
