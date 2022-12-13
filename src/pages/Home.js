import React from "react";
import { FaReact, FaHtml5, FaCss3 } from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";

const Home = () => {
  return (
    <div className="bg-slate-200 h-[calc(100vh-6rem)] w-full p-4">
      <h1 className="text-base-100">Phone Book</h1>
      <h4 className="text-base-100">by Grefel Nable</h4>
      <p className="text-slate-700 mt-4 max-w-lg mb-4 leading-7">
        Phone Book is a simple app that stores person's name and phone number.
        It also features an edit and delete option to update each contact
        information. The design is mobile friendly and very responsive up to
        bigger screen.
      </p>
      <h5 className="text-base-100 mb-4">Technologies Used:</h5>
      <div className="flex gap-3 text-6xl">
        <span className="text-secondary-focus">
          <FaReact />
        </span>
        <span className="text-yellow-500">
          <SiJavascript />
        </span>
        <span className="text-orange-600">
          <FaHtml5 />
        </span>
        <span className="text-blue-600">
          <FaCss3 />
        </span>
        <span className="text-sky-600">
          <SiTailwindcss />
        </span>
      </div>
    </div>
  );
};

export default Home;
