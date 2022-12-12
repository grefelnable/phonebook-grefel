import React from "react";

const Menu = ({ setIsModalOpen, isModalOpen }) => {
  return (
    <section
      className="w-1/4 h-[calc(100vh-6rem)] pt-8 
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

      <button className="btn btn-ghost btn-xs block mx-auto mb-4">
        All Contacts
      </button>
      <button className="btn btn-ghost btn-xs block mx-auto">Favorites</button>
    </section>
  );
};

export default Menu;
