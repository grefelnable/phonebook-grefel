import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <div className="section-center">
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
