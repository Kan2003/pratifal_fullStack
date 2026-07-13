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
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${API_URl}/users/verify-token`, {
          withCredentials: true,
        });
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

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
  }, []);

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
