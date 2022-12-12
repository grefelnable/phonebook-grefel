import React from "react";

const Menu = ({ setIsModalOpen, isModalOpen }) => {
  return (
    <section
      className="md:w-1/4 md:h-[calc(100vh-6rem)] pt-8 
    "
    >
      <div className="mb-8 text-center w-100">
        <button
          type="button"
          className="btn btn-primary btn-sm text-center "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          add contact
        </button>
      </div>
    </section>
  );
};

export default Menu;
