import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useGlobalState from "../Hooks/useGlobalState";
import Home from "../Pages/Home";
import Admin from "../Pages/Admin";
import User from "../Pages/User";
import AdminProperty from "../Pages/AdminProperty";

const SecondHomeRoutes = () => {
  const { activeUser } = useGlobalState();
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route
        path="/admin"
        element={activeUser?.role === "admin" ? <Admin /> : <Navigate to="/" />}
      />
      <Route
        path="/admin/user"
        element={activeUser?.role === "admin" ? <User /> : <Navigate to="/" />}
      />
      <Route
        path="/admin/property"
        element={
          activeUser?.role === "admin" ? <AdminProperty /> : <Navigate to="/" />
        }
      />
      <Route
        path="/listings"
        element={activeUser?.role === "user" ? <Home /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default SecondHomeRoutes;
