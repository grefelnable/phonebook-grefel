import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import phonebookServices from "../services/phonebook";
import AddContact from "../components/AddContact";
import Contacts from "../components/Contacts";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([
    { name: "Grefel Nable", number: "647 774 3845" },
    { name: "Marca Pina", number: "774 345 6789" },
    { name: "Carlo Rossi", number: "789 456 1234" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch all contacts from firebase
  useEffect(() => {
    getContacts();
  }, []);
  const getContacts = async () => {
    const data = await phonebookServices.getAllContacts();
    console.log(
      data.docs.map((doc) => {
        return doc.id;
      })
    );
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (!newName || !newNumber) {
      toast.error("Please Fill Out Fields");
      return;
    }
    setPersons(persons.concat(personObject));
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
      <div className="flex">
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
