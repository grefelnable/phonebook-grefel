import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import phonebookServices from "../services/phonebook";
import AddContact from "../components/AddContact";
import Contacts from "../components/Contacts";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch all contacts from firebase
  useEffect(() => {
    getContacts();
    console.log(persons);
  }, []);
  const getContacts = async () => {
    const data = await phonebookServices.getAllContacts();
    setPersons(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
  // add Contact
  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (!newName || !newNumber) {
      toast.error("Please Fill Out Fields");
      return;
    }
    try {
      await phonebookServices.addContact(personObject);
      toast.success("Contact Added Successfully!");
    } catch (err) {
      toast.error(`${err.message}`);
    }

    setNewName("");
    setNewNumber("");
    setIsModalOpen(false);
    console.log("submitted", persons);
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
    <main>
      <div className="md:flex">
        {/* left menu */}
        <Menu setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        {/* mid menu */}
        <Contacts persons={persons} />
      </div>
      <AddContact
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </main>
  );
};

export default TheApp;
