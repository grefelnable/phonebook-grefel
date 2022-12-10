import React from "react";

const Menu = () => {
  return (
    <section
      className="border border-pink-500 w-1/4 h-[calc(100vh-6rem)] pt-8 
    "
    >
      <div className="mb-8 text-center w-100">
        <label
          htmlFor="add-contact"
          className="btn btn-primary btn-sm text-center "
        >
          add contact
        </label>
      </div>

      <button className="btn btn-ghost btn-xs block mx-auto">
        All Contacts
      </button>
    </section>
  );
};

export default Menu;