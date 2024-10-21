import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { createContext } from 'react';
import ChangePassword from "./components/ChangePassword.jsx";


// Create UserContext
export const UserContext = createContext();

// Lazy load components
import Register from "./components/Ragister.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./components/Home.jsx";
import Page from "./components/Page.jsx";
import Profile from "./components/Profile.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [showCreateForm , setShowCreateForm] = useState(false)

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<Page />} />

          <Route 
            element={
              <UserContext.Provider value={{ user, setUser , search , setSearch , showCreateForm , setShowCreateForm}}>
                <PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                  <Outlet />
                </PrivateRoute>
              </UserContext.Provider>
            }
          >
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updatePassword" element={<ChangePassword/>} />

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
