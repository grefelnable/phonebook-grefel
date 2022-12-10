import { useState } from "react";
import AddContact from "../components/AddContact";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([{ name: "Grefel Nable" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("submitted");
  };
  return (
    <main>
      <div className="flex">
        {/* left menu */}
        <Menu />
        {/* mid menu */}
        <div>mid menu</div>
      </div>
      <AddContact addPerson={addPerson} />
    </main>
  );
};

export default TheApp;
