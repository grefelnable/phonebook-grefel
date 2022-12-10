import React from "react";

const Menu = () => {
  return (
    <section
      className="border border-pink-500 
     w-1/4 h-[calc(100vh-6rem)] pt-8 
    "
    >
      <button className="btn btn-primary btn-sm block mx-auto mb-8">
        add contact
      </button>
      <button className="btn btn-ghost btn-xs block mx-auto">
        All Contacts
      </button>
    </section>
  );
};

export default Menu;
