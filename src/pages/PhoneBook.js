import { useState } from "react";
import AddContact from "../components/AddContact";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([{ name: "Grefel Nable" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("submitted");
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
        <Menu />
        {/* mid menu */}
        <div>mid menu</div>
      </div>
      <AddContact
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
    </main>
  );
};

export default TheApp;
