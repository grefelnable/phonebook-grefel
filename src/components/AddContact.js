import { useState } from "react";
import { toast } from "react-toastify";
import phonebookServices from "../services/phonebook";

const AddContact = ({ isModalOpen, setIsModalOpen, getContacts }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  // add Contact
  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    // Run error if fields are empty
    if (!newName || !newNumber) {
      toast.error("Please Fill Out Fields");
      return;
    }
    // Add Contact
    try {
      await phonebookServices.addContact(personObject);
      toast.success("Contact Added Successfully!");
    } catch (err) {
      toast.error(`${err.message}`);
    }

    setNewName("");
    setNewNumber("");
    setIsModalOpen(false);
    getContacts();
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  return (
    <>
      <div className={`modal ${isModalOpen === true ? "modal-open" : ""}`}>
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
