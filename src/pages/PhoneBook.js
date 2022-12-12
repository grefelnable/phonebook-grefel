import { useState, useEffect } from "react";
import phonebookServices from "../services/phonebook";
import AddContact from "../components/AddContact";
import Contacts from "../components/Contacts";
import Menu from "../components/Menu";

const TheApp = () => {
  const [persons, setPersons] = useState([]);
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

  return (
    <main>
      <div className="md:flex">
        {/* left menu */}
        <Menu setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        {/* mid menu */}
        <Contacts persons={persons} />
      </div>
      <AddContact isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </main>
  );
};

export default TheApp;
