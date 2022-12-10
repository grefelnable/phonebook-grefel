import React from "react";

const AddContact = ({ addPerson }) => {
  return (
    <>
      <input type="checkbox" id="add-contact" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={addPerson} className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Contact</h3>
          <input
            value={newName}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Number"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="modal-action">
            <label htmlFor="add-contact" className="btn btn-secondary">
              add
            </label>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContact;
