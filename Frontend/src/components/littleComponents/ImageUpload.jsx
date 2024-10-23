
import React, { useState, useRef } from "react";
import axios from "axios";
import cross from "../../assets/cross.svg";

const API_URL = import.meta.env.VITE_API_URL;

const ImageUploader = ({ setImageUpload, user, setUser }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  // Drag and Drop Handlers
  const handleDragEnter = (e) => e.preventDefault();
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let droppedFile = e.dataTransfer.files[0];
    handleFileValidation(droppedFile);
    setDragOver(false);
  };

  // File Validation and Preview
  const handleFileValidation = (file) => {
    let fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      setError("Not an image file");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    setFile(file);
  };

  const handleAddImage = (e) => {
    const selectedFile = imageRef.current.files[0];
    handleFileValidation(selectedFile);
  };

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await axios.patch(`${API_URL}/users/update-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSuccess("Profile image updated successfully");
        setUser(response.data.data);
        setTimeout(() => {
          setImageUpload(false);
          setSuccess("");
        }, 1000);
      }
    } catch (err) {
      setError("Error uploading profile image");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpload = () => {
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
      <img className="absolute right-2 top-14 cursor-pointer xs:w-[30px] xs:h-[30px]  " onClick={() => setImageUpload(false)} src={cross} alt="Close" />
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-md shadow-lg">
        {loading && <div className="spinner-border animate-spin"></div>}
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-4" />
        )}
        <div className={`w-80 h-48 flex flex-col items-center justify-center ${dragOver ? 'border-indigo-600' : 'border-gray-300'} border-2 border-dashed p-4`}>
          <div className="icon-text-box text-center">
            <i className="fa fa-upload text-4xl text-indigo-500 mb-4" aria-hidden="true" />
            <div>{file ? <h4 className="text-lg font-medium">{file.name}</h4> : "Choose or Drag Image"}</div>
          </div>
          <div className="mt-2">
            <input
              type="file"
              ref={imageRef}
              id="upload-image-input"
              className="mt-2 w-full text-sm text-gray-500 file:bg-indigo-50 file:text-indigo-700 file:rounded-full file:py-2 file:px-4 hover:file:bg-indigo-100"
              accept="image/*"
              onChange={handleAddImage}
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            />
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4 flex gap-4">
          <button
            className="py-2 px-7 bg-zinc-900 xs:px-3 xs:text-[10px] sm:text-[12px] sm:px-4 md:px-7 lg:px-7 xl:px-7 2xl:px-7 rounded-3xl text-[12px]  flex items-center tracking-normal justify-center text-white font-headlandOne transition-all duration-500 ease-in-out  hover:bg-[#58B9ED] hover:text-black"
            onClick={handleCancelUpload}
            disabled={!file || loading}
          >
            Cancel
          </button>
          <button
            className="py-2 px-7 bg-zinc-900 xs:px-3 xs:text-[10px] sm:text-[12px] sm:px-4 md:px-7 lg:px-7 xl:px-7 2xl:px-7 rounded-3xl text-[12px]  flex items-center tracking-normal justify-center text-white font-headlandOne transition-all duration-500 ease-in-out  hover:bg-[#58B9ED] hover:text-black"
            onClick={handleImageUpload}
            disabled={!file || loading}
          >
            Upload
          </button>
        </div>
        {success && <div className="text-green-500 mt-4">{success}</div>}
      </div>
    </div>
  );
};

export default ImageUploader;
