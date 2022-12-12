import React from "react";

const AddContact = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <>
      <div className={`${isModalOpen === true ? "modal-open modal" : ""}`}>
        <form onSubmit={addPerson} className="modal-box">
          <h3 className="font-bold text-lg mb-8">Add Contact</h3>
          <input
            value={newName}
            onChange={handleNameChange}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <input
            value={newNumber}
            onChange={handleNumberChange}
            type="text"
            placeholder="Number"
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-secondary btn-sm block">
              add
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="btn btn-error btn-sm block"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddContact;
