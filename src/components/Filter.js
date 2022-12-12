import React from "react";

const Filter = ({ searchHandler }) => {
  return (
    <div className="flex items-center gap-2 justify-between mb-4">
      <h1 className="text-2xl text-base-100 font-bold mb-4">All Contacts</h1>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered input-primary w-full max-w-xs input-sm"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Filter;
