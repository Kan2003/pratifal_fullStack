import axios from "axios";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import DashBoardNavbar from "./DashBoardNavbar";
const API_URl = import.meta.env.VITE_API_URL;

const PrivateRoute = ({ handleLogout ,  children, isAuthenticated, setIsAuthenticated }) => {
  const {
    user,
    setUser,
    search,
    setSearch,
    showCreateForm,
    setShowCreateForm,
    tokens,
    setTokens
  } = useContext(UserContext);
 
  const navigate = useNavigate();



  const refreshTokenHandler = async () => {
    if (!tokens.refreshToken) return;

    try {
      console.log("Refreshing access token...");
      const { data } = await axios.post(`${API_URl}/users/refresh-accesstoken`, {
        refreshToken: tokens.refreshToken,
      });

      if (data.success) {
        const newAccessToken = data.accessToken;
        setTokens((prev) => ({ ...prev, accessToken: newAccessToken }));
        console.log("Access token refreshed successfully:", newAccessToken);
      } else {
        console.error("Error refreshing token:", data.message);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${API_URl}/users/verify-token`, {
          withCredentials: true,
        });
        console.log('data' , data)
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);



  const checkTokenExpiry = () => {
    console.log("Checking access token expiration...");
    if (!tokens.accessToken) return;

    const accessTokenExpiry = new Date(tokens.accessToken.exp * 1000);
    console.log("Access Token Expiry Time:", accessTokenExpiry);
    const timeDiff = accessTokenExpiry - new Date();

    if (timeDiff <= 60000) {
      console.log("Access token is about to expire. Refreshing...");
      refreshTokenHandler();
    }
  };

  useEffect(() => {
    if (tokens.accessToken) {
      checkTokenExpiry();
      const intervalId = setInterval(checkTokenExpiry, 30000);
      return () => clearInterval(intervalId);
    }
  }, [tokens.accessToken]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URl}/users`,{
          withCredentials: true, // Include cookies with the request
        });
        setUser(data.data);
      } catch (error) {
        console.log("first error", error);
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

 
  

  
  

  return (
    <>
      {isAuthenticated && (
        <DashBoardNavbar
          handleLogout={handleLogout}
          user={user}
          userImage={user?.profile}
          search={search}
          setSearch={setSearch}
          setShowCreateForm={setShowCreateForm}
          showCreateForm={showCreateForm}
        />
      )}
      {children}
    </>
  );
};

export default PrivateRoute;
