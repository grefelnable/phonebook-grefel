import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import phonebookServices from "../services/phonebook";

const AddContact = ({
  isModalOpen,
  setIsModalOpen,
  getContacts,
  contactId,
  setContactId,
  persons,
}) => {
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

    // Add or update Contact
    try {
      // Check if it's an update or new addition
      if (contactId !== undefined && contactId !== "") {
        await phonebookServices.updateContact(contactId, personObject);
        setContactId("");
        toast.success("Updated Successfully!");
      } else {
        // Check for duplicates
        if (
          persons.find((person) => person.name === personObject.name) ||
          persons.find(
            (person) =>
              person.name === personObject.name &&
              person.number === personObject.number
          )
        ) {
          return toast.error(`${newName} is already added to the phonebook.`);
        }
        await phonebookServices.addContact(personObject);
        toast.success("Contact Added Successfully!");
      }
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

  // Populate the form with the specific contact to be edited
  const editHandler = async () => {
    try {
      const docSnapshot = await phonebookServices.getContact(contactId);
      console.log("The record is", docSnapshot.data());
      setNewName(docSnapshot.data().name);
      setNewNumber(docSnapshot.data().number);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  // Runs to edit contact
  useEffect(() => {
    console.log("The id here is: ", contactId);
    if (contactId !== undefined && contactId !== "") {
      editHandler();
    }
  }, [contactId]);
  return (
    <>
      <div className={`modal ${isModalOpen === true ? "modal-open" : ""}`}>
        <form onSubmit={addPerson} className="modal-box">
          <h3 className="font-bold text-lg mb-8">Add/Edit Contact</h3>
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
              add/edit
            </button>
            <button
              type="button"
              onClick={() => (
                setIsModalOpen(!isModalOpen), setNewName(""), setNewNumber("")
              )}
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
